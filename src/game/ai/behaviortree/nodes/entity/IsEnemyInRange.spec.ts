import { World } from 'ecsy';
import { IWorld, buildWorld } from 'sim-ecs';

import { Transform } from '../../../../components/Transform';
import { Vector2 } from '../../../../math/Vector2';
import { Node, State } from '../Node';
import { Combat } from '../../../../components/ai/Combat';

import { EcsyEntity } from './../../../../components/EcsyEntity';
import { Team } from './../../../../components/Team';
import { SimEcsComponent } from './../../../../systems/SimEcsComponent';
import { getEntitiesInRange } from './utils';
import { IsEnemyInRange } from './IsEnemyInRange';


jest.mock('./utils');

describe('IsEnemyInRange', () => {
  describe('evaluate', () => {
    let newWorld: IWorld;
    let world: World;

    beforeEach(() => {
      world = new World()
        .registerComponent(SimEcsComponent);
      newWorld = buildWorld().build();

      (getEntitiesInRange as jest.MockedFunction<any>).mockClear();
    });

    it('should success set target when there is an enemy within range', () => {
      const entitiesInRange = [
        world
          .createEntity()
          .addComponent(SimEcsComponent, {
            entity: newWorld.buildEntity()
              .with(new Team(2))
              .with(new Transform(new Vector2(0, 0)))
              .build(),
          }),
      ];
      (getEntitiesInRange as jest.MockedFunction<any>).mockReturnValue(
        entitiesInRange
      );

      const entity = newWorld.buildEntity()
        .with(new Team(1))
        .with(new Transform(Vector2.ZERO))
        .with(new Combat(100, 0, 0))
        .build();
      const ecsyEntity = world
        .createEntity()
        .addComponent(SimEcsComponent, {
          entity: entity,
        });
      entity.addComponent(new EcsyEntity(ecsyEntity));

      const node = new IsEnemyInRange([], Combat, 'aggroRange');
      const parent = new Node();
      parent.setData('entity', entity);
      parent.attach(node);

      expect(node.evaluate()).toBe(State.SUCCESS);
      expect(parent.getData('target')).not.toBeNull();
      expect(getEntitiesInRange).toBeCalledWith(
        expect.anything(),
        expect.anything(),
        100
      );
    });

  });
});

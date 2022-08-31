import { World } from 'ecsy';
import { IWorld, buildWorld } from 'sim-ecs';

import { TransformComponent } from '../../../../components/TransformComponent';
import { Vector2 } from '../../../../math/Vector2';
import { Node, State } from '../Node';

import { Team } from './../../../../components/Team';
import { SimEcsComponent } from './../../../../systems/SimEcsComponent';
import { AttackComponent } from './../../../../systems/AttackComponent';
import { getEntitiesInRange } from './utils';
import { IsEnemyInRange } from './IsEnemyInRange';


jest.mock('./utils');

describe('IsEnemyInRange', () => {
  describe('evaluate', () => {
    let newWorld: IWorld;
    let world: World;

    beforeEach(() => {
      world = new World()
        .registerComponent(AttackComponent)
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
              .with(new TransformComponent({
                position: new Vector2(0, 0),
              }))
              .build(),
          }),
      ];
      (getEntitiesInRange as jest.MockedFunction<any>).mockReturnValue(
        entitiesInRange
      );

      const entity = world
        .createEntity()
        .addComponent(AttackComponent, {
          aggroRange: 100,
        })
        .addComponent(SimEcsComponent, {
          entity: newWorld.buildEntity()
            .with(new Team(1))
            .with(new TransformComponent({
              position: new Vector2(0, 0),
            }))
            .build(),
        });
      const node = new IsEnemyInRange([], AttackComponent, 'aggroRange');
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

    // it('should fail and not set target when there is no enemy within range', () => {
    //     (getEntitiesInRange as jest.MockedFunction<any>).mockReturnValue([]);

    //     const entity = world.createEntity()
    //         .addComponent(TransformComponent, {
    //             position: new Vector2(0, 0),
    //         })
    //         .addComponent(TeamComponent, {
    //             number: 1
    //         });

    //     const node = new IsEnemyInRange([], 100);
    //     const parent = new Node();
    //     parent.setData('entity', entity);
    //     parent.attach(node);

    //     expect(node.evaluate()).toBe(State.FAILURE);
    //     expect(parent.getData('target')).toBeNull();
    // });
  });
});

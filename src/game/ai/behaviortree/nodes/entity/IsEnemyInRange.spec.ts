import { IWorld, buildWorld } from 'sim-ecs';

import { Transform } from '../../../../components/Transform';
import { Vector2 } from '../../../../math/Vector2';
import { Node, State } from '../Node';
import { Combat } from '../../../../components/ai/Combat';

import { Team } from './../../../../components/Team';
import { getEntitiesInRange } from './utils';
import { IsEnemyInRange } from './IsEnemyInRange';


jest.mock('./utils');

describe('IsEnemyInRange', () => {
  describe('evaluate', () => {
    let world: IWorld;

    beforeEach(() => {
      world = buildWorld().build();

      (getEntitiesInRange as jest.MockedFunction<any>).mockClear();
    });

    it('should success set target when there is an enemy within range', () => {
      const entitiesInRange = [
        world.buildEntity()
          .with(Team.CPU)
          .with(new Transform(new Vector2(0, 0)))
          .build(),
      ];
      (getEntitiesInRange as jest.MockedFunction<any>).mockReturnValue(
        entitiesInRange
      );

      const entity = world.buildEntity()
        .with(Team.PLAYER)
        .with(new Transform(Vector2.ZERO))
        .with(new Combat(1, 0, 0))
        .build();

      const node = new IsEnemyInRange([], Combat, 'aggroRange');
      const parent = new Node();
      parent.setData('entity', entity);
      parent.attach(node);

      expect(node.evaluate()).toBe(State.SUCCESS);
      expect(parent.getData('target')).not.toBeNull();
      expect(getEntitiesInRange).toBeCalledWith(
        expect.anything(),
        expect.anything(),
        16
      );
    });

  });
});

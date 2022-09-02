import { buildWorld } from 'sim-ecs';

import { Vector2 } from '../../../../math/Vector2';
import { MovePositionDirect } from '../../../../components/movement/MovePositionDirect';
import { State } from '../Node';

import { IsMoving } from './IsMoving';

describe('IsMoving', () => {
  describe('evaluate', () => {
    const world = buildWorld().build();

    it('should return failure when entity has no MovePositionDirect', () => {
      const entity = world.buildEntity().build();

      const setTarget = new IsMoving();
      setTarget.setData('entity', entity);

      expect(setTarget.evaluate()).toBe(State.FAILURE);
    });

    it("should return failure when entity's MovePositionDirect movePosition is null", () => {
      const entity = world.buildEntity()
        .with(new MovePositionDirect(null))
        .build();
      const setTarget = new IsMoving();
      setTarget.setData('entity', entity);

      expect(setTarget.evaluate()).toBe(State.FAILURE);
    });

    it("should return success when entity's MovePositionDirect movePosition is null", () => {
      const entity = world.buildEntity()
        .with(new MovePositionDirect(new Vector2(1, 2)))
        .build();
      const setTarget = new IsMoving();
      setTarget.setData('entity', entity);

      expect(setTarget.evaluate()).toBe(State.SUCCESS);
    });
  });
});

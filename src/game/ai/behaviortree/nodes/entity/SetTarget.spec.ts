import { buildWorld, IEntity } from 'sim-ecs';

import { Target } from '../../../../components/ai/Target';
import { State } from '../Node';

import { SetTarget } from './SetTarget';

describe('SetTarget', () => {
  describe('evaluate', () => {
    const world = buildWorld().build();

    const createEntity = (target: IEntity | null = null) =>
      world.buildEntity().with(new Target(target)).build();

    it('should return failure when entity has no TargetComponent', () => {
      const entity = world.buildEntity().build();
      const target = createEntity();

      const setTarget = new SetTarget();
      setTarget.setData('entity', entity);
      setTarget.setData('target', target);

      expect(setTarget.evaluate()).toBe(State.FAILURE);
    });

    it('should return failure when no target is set', () => {
      const entity = createEntity();

      const setTarget = new SetTarget();
      setTarget.setData('entity', entity);

      expect(setTarget.evaluate()).toBe(State.FAILURE);
      expect(entity.getComponent(Target)!.entity).toBeNull();
    });

    it("should set entity's TargetComponent and return success", () => {
      const entity = createEntity();
      const target = createEntity();

      const setTarget = new SetTarget();
      setTarget.setData('entity', entity);
      setTarget.setData('enemy', target);

      expect(setTarget.evaluate()).toBe(State.SUCCESS);
      expect(entity.getComponent(Target)!.entity).toBe(target);
    });
  });
});

import { buildWorld, IEntity } from 'sim-ecs';

import { Target } from '../../../../components/ai/Target';
import { State } from '../Node';

import { UnsetTarget } from './UnsetTarget';


describe('UnsetTarget', () => {
  describe('evaluate', () => {
    const world = buildWorld().build();

    const createEntity = (target: IEntity | null = null) =>
      world.buildEntity()
        .with(new Target(target))
        .build();

    it('should return failure when entity has no TargetComponent', () => {
      const entity = world.buildEntity().build();

      const unsetTarget = new UnsetTarget();
      unsetTarget.setData('entity', entity);

      expect(unsetTarget.evaluate()).toBe(State.FAILURE);
    });

    it('should return failure when entity has no target set in TargetComponent', () => {
      const entity = createEntity();

      const unsetTarget = new UnsetTarget();
      unsetTarget.setData('entity', entity);

      expect(unsetTarget.evaluate()).toBe(State.FAILURE);
    });

    it('should return success when entity has unset target in TargetComponent', () => {
      const target = createEntity();
      const entity = createEntity(target);

      const unsetTarget = new UnsetTarget();
      unsetTarget.setData('entity', entity);

      expect(unsetTarget.evaluate()).toBe(State.SUCCESS);
      expect(entity.getComponent(Target)!.entity).toBeNull();
    });
  });
});

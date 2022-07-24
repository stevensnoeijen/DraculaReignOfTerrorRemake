import { World } from 'ecsy';

import { UnsetTarget } from './UnsetTarget';
import { TargetComponent } from '../../../../systems/ai/TargetComponent';
import { State } from '../Node';

describe('UnsetTarget', () => {
  describe('evaluate', () => {
    const world = new World().registerComponent(TargetComponent);
    it('should return failure when entity has no TargetComponent', () => {
      const entity = world.createEntity();

      const unsetTarget = new UnsetTarget();
      unsetTarget.setData('entity', entity);

      expect(unsetTarget.evaluate()).toBe(State.FAILURE);
    });

    it('should return failure when entity has no target set in TargetComponent', () => {
      const entity = world.createEntity().addComponent(TargetComponent, {
        target: null,
      });

      const unsetTarget = new UnsetTarget();
      unsetTarget.setData('entity', entity);

      expect(unsetTarget.evaluate()).toBe(State.FAILURE);
    });

    it('should return success when entity has unset target in TargetComponent', () => {
      const entity = world.createEntity().addComponent(TargetComponent, {
        target: world.createEntity(),
      });

      const unsetTarget = new UnsetTarget();
      unsetTarget.setData('entity', entity);

      expect(unsetTarget.evaluate()).toBe(State.SUCCESS);
      expect(entity.getComponent(TargetComponent)!.target).toBeNull();
    });
  });
});

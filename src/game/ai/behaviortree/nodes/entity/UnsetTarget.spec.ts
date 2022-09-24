import { buildWorld } from 'sim-ecs';

import { State } from '../Node';

import { UnsetTarget } from './UnsetTarget';

describe('UnsetTarget', () => {
  describe('evaluate', () => {
    const world = buildWorld().build();

    const createEntity = () => world.buildEntity().build();

    it('should return success when entity has no target', () => {
      const entity = createEntity();

      const unsetTarget = new UnsetTarget();
      unsetTarget.setData('entity', entity);

      expect(unsetTarget.evaluate()).toBe(State.SUCCESS);
    });

    it('should return success when entity has unset target in target-component', () => {
      const target = createEntity();
      const entity = createEntity();

      const unsetTarget = new UnsetTarget();
      unsetTarget.setData('entity', entity);
      unsetTarget.setData('target', target);

      expect(unsetTarget.evaluate()).toBe(State.SUCCESS);
      expect(unsetTarget.hasData('target')).toBe(false);
    });
  });
});

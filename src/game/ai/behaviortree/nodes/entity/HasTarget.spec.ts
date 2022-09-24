import { buildWorld } from 'sim-ecs';

import { State } from '../Node';

import { HasTarget } from './HasTarget';

describe('HasTarget', () => {
  describe('evaluate', () => {
    const world = buildWorld().build();

    const createEntity = () => world.buildEntity().build();

    it('should return failure when entity has no target', () => {
      const entity = world.buildEntity().build();

      const hasTarget = new HasTarget();
      hasTarget.setData('entity', entity);

      expect(hasTarget.evaluate()).toBe(State.FAILURE);
    });

    it('should return failure when entity has no target', () => {
      const entity = createEntity();

      const hasTarget = new HasTarget();
      hasTarget.setData('entity', entity);

      expect(hasTarget.evaluate()).toBe(State.FAILURE);
    });

    it('should return success when entity has target', () => {
      const entity = createEntity();
      const target = world.createEntity();

      const hasTarget = new HasTarget();
      hasTarget.setData('entity', entity);
      hasTarget.setData('target', target);

      expect(hasTarget.evaluate()).toBe(State.SUCCESS);
    });
  });
});

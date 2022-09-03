import { buildWorld, IEntity } from 'sim-ecs';


import { Target } from '../../../../components/ai/Target';
import { State } from '../Node';

import { HasTarget } from './HasTarget';


describe('HasTarget', () => {
  describe('evaluate', () => {
    const world = buildWorld().build();

    const createEntity = (target: IEntity | null = null) =>
      world.buildEntity()
        .with(new Target(target))
        .build();

    it('should return failure when entity has no TargetComponent', () => {
      const entity = world.buildEntity().build();

      const hasTarget = new HasTarget();
      hasTarget.setData('entity', entity);

      expect(hasTarget.evaluate()).toBe(State.FAILURE);
    });

    it('should return failure when entity has no target set in TargetComponent', () => {
      const entity = createEntity(null);

      const hasTarget = new HasTarget();
      hasTarget.setData('entity', entity);

      expect(hasTarget.evaluate()).toBe(State.FAILURE);
    });

    it('should return success when entity has target set in TargetComponent', () => {
      const entity = createEntity(world.createEntity());

      const hasTarget = new HasTarget();
      hasTarget.setData('entity', entity);

      expect(hasTarget.evaluate()).toBe(State.SUCCESS);
    });
  });
});

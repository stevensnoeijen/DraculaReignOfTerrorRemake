import { Entity, World } from 'ecsy';
import { buildWorld } from 'sim-ecs';


import { Target } from '../../../../components/ai/Target';
import { State } from '../Node';

import { HasTarget } from './HasTarget';

import { SimEcsComponent } from '~/game/systems/SimEcsComponent';

describe('HasTarget', () => {
  describe('evaluate', () => {
    const newWorld = buildWorld().build();
    const world = new World().registerComponent(SimEcsComponent);
    const createEntity = (target: Entity | null = null) =>
      world.createEntity().addComponent(SimEcsComponent, {
        entity: newWorld.buildEntity()
          .with(new Target(target))
          .build(),
      });

    it('should return failure when entity has no TargetComponent', () => {
      const entity = world.createEntity().addComponent(SimEcsComponent, {
        entity: newWorld.buildEntity().build()
      });

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

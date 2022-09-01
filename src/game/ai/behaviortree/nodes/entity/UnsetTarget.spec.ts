import { buildWorld } from 'sim-ecs';
import { World, Entity } from 'ecsy';

import { Target } from '../../../../components/ai/Target';
import { State } from '../Node';

import { SimEcsComponent } from './../../../../systems/SimEcsComponent';
import { UnsetTarget } from './UnsetTarget';

import { getSimComponent } from '~/game/systems/utils';

describe('UnsetTarget', () => {
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
      expect(getSimComponent(entity, Target)!.entity).toBeNull();
    });
  });
});

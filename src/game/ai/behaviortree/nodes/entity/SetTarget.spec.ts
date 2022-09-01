import { Entity, World } from 'ecsy';
import { buildWorld } from 'sim-ecs';


import { Target } from '../../../../components/ai/Target';
import { State } from '../Node';

import { SetTarget } from './SetTarget';

import { SimEcsComponent } from '~/game/systems/SimEcsComponent';
import { getSimComponent } from '~/game/systems/utils';

describe('SetTarget', () => {
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
      expect(getSimComponent(entity, Target)!.entity).toBeNull();
    });

    it("should set entity's TargetComponent and return success", () => {
      const entity = createEntity();
      const target = createEntity();

      const setTarget = new SetTarget();
      setTarget.setData('entity', entity);
      setTarget.setData('target', target);

      expect(setTarget.evaluate()).toBe(State.SUCCESS);
      expect(getSimComponent(entity, Target)!.entity).toBe(target);
    });
  });
});

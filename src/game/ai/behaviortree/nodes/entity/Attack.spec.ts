import { buildWorld } from 'sim-ecs';

import { State } from '../Node';
import { Combat } from '../../../../components/ai/Combat';

import { Attack } from './Attack';

import { Target } from '~/game/components/ai/Target';

describe('Attack', () => {
  describe('evaluate', () => {
    const world = buildWorld().build();

    it("should set entity's attacking to target's entity", () => {
      const target = world.buildEntity().build();
      const entity = world
        .buildEntity()
        .with(new Combat(0, 0, 10, 0))
        .with(new Target(target))
        .build();

      const attack = new Attack();
      attack.setData('entity', entity);

      expect(attack.evaluate()).toBe(State.SUCCESS);
      expect(entity.getComponent(Combat)!.target).toEqual(target);
    });

    it('should fail if entity has no combat-component', () => {
      const entity = world.buildEntity().with(new Target()).build();

      const attack = new Attack();
      attack.setData('entity', entity);

      expect(attack.evaluate()).toBe(State.FAILURE);
    });

    it('should fail if entity has no target-component', () => {
      const entity = world.buildEntity().with(new Combat(0, 0, 10, 0)).build();

      const attack = new Attack();
      attack.setData('entity', entity);

      expect(attack.evaluate()).toBe(State.FAILURE);
    });

    it('should fail if entity has no target', () => {
      const entity = world
        .buildEntity()
        .with(new Combat(0, 0, 10, 0))
        .with(new Target())
        .build();

      const attack = new Attack();
      attack.setData('entity', entity);

      expect(attack.evaluate()).toBe(State.FAILURE);
    });
  });
});

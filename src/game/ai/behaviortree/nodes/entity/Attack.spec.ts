import { buildWorld } from 'sim-ecs';

import { State } from '../Node';

import { Attack } from './Attack';

import { Combat } from '~/game/components/ai/Combat';
import { Target } from '~/game/components/ai/Target';
import { CombatController } from '~/game/combat/CombatController';
import { Aggro } from '~/game/combat/Aggro';
import { Attack as CombatAttack } from '~/game/combat/Attack';

describe('Attack', () => {
  describe('evaluate', () => {
    const world = buildWorld().build();

    const createCombat = () => {
      return new Combat(
        new CombatController({
          aggro: {} as Aggro,
          attack: {} as CombatAttack,
        })
      );
    };

    it("should set entity's attacking to target's entity", () => {
      const target = world.buildEntity().build();
      const entity = world
        .buildEntity()
        .with(createCombat())
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
      const entity = world.buildEntity().with(createCombat()).build();

      const attack = new Attack();
      attack.setData('entity', entity);

      expect(attack.evaluate()).toBe(State.FAILURE);
    });

    it('should fail if entity has no target', () => {
      const entity = world
        .buildEntity()
        .with(createCombat())
        .with(new Target())
        .build();

      const attack = new Attack();
      attack.setData('entity', entity);

      expect(attack.evaluate()).toBe(State.FAILURE);
    });
  });
});

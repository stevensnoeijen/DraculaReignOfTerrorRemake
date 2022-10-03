import { buildWorld } from 'sim-ecs';

import { Health } from '../components/Health';
import { Range } from '../utils/Range';

import { CombatController } from './CombatController';
import { Attack } from './Attack';
import { Aggro } from './Aggro';

describe('Attack', () => {
  const world = buildWorld().build();

  describe('update', () => {
    it('should take hit to enemy', () => {
      const enemy = world
        .buildEntity()
        .with(
          new Health({
            points: 100,
            maxPoints: 100,
          })
        )
        .build();

      const attack = new Attack({
        range: Range.ZERO,
        damage: new Range(1, 1),
        hitChance: 1,
        cooldownTime: 0,
      });
      const combatController = new CombatController({
        attack,
        aggro: {} as Aggro,
      });
      combatController.target = enemy;

      attack.update();

      expect(enemy.getComponent(Health)!.points).toEqual(99);
    });
  });
});

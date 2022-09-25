import { buildWorld } from 'sim-ecs';

import { Health } from '../Health';

import { Combat } from './Combat';

describe('Combat', () => {
  describe('attack', () => {
    const world = buildWorld().build();

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
      const combat = new Combat(0, 0, 10, 0);
      combat.target = enemy;

      combat.attack();

      expect(enemy.getComponent(Health)!.points).toEqual(90);
    });
  });
});

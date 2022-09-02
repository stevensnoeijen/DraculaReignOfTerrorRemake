import { buildWorld } from 'sim-ecs';
import { World } from 'ecsy';

import { Health } from '../Health';

import { Combat } from './Combat';

import { SimEcsComponent } from '~/game/systems/SimEcsComponent';


describe('Combat', () => {
  describe('attack', () => {
    const newWorld = buildWorld().build();
    const world = new World().registerComponent(SimEcsComponent);

    it('should take hit to enemy', () => {
      const enemy = newWorld.buildEntity()
        .with(new Health({
          points: 100,
          maxPoints: 100,
        }))
      .build();
      const combat = new Combat(0, 0, 10);

      combat.attack(enemy);

      expect(enemy.getComponent(Health)!
        .points).toEqual(90);
    });
  });
});

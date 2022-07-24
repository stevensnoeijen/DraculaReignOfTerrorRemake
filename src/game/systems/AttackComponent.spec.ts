import { World } from 'ecsy';

import { AttackComponent } from './AttackComponent';
import { HealthComponent } from './health/HealthComponent';

describe('AttackComponent', () => {
  describe('attack', () => {
    const world = new World().registerComponent(HealthComponent);

    it('should take hit to enemy', () => {
      const enemy = world.createEntity().addComponent(HealthComponent, {
        points: 100,
      });
      const attackComponent = new AttackComponent({
        attackDamage: 10,
      });

      attackComponent.attack(enemy);

      expect(enemy.getComponent(HealthComponent)!.points).toEqual(90);
    });
  });
});

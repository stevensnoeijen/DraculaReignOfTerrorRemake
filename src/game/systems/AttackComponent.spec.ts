import { buildWorld } from 'sim-ecs';
import { World } from 'ecsy';

import { Health } from '../components/Health';

import { AttackComponent } from './AttackComponent';
import { SimEcsComponent } from './SimEcsComponent';


describe('AttackComponent', () => {
  describe('attack', () => {
    const newWorld = buildWorld().build();
    const world = new World().registerComponent(SimEcsComponent);

    it('should take hit to enemy', () => {
      const enemy = world.createEntity().addComponent(SimEcsComponent, {
        entity: newWorld.buildEntity()
          .with(new Health({
            points: 100,
            maxPoints: 100,
          }))
        .build(),
      });
      const attackComponent = new AttackComponent({
        attackDamage: 10,
      });

      attackComponent.attack(enemy);

      expect(enemy.getComponent(SimEcsComponent)!
        .entity.getComponent(Health)!
        .points).toEqual(90);
    });
  });
});

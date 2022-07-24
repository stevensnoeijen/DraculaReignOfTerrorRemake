import { AttackComponent } from './../../../../systems/AttackComponent';
import { HealthComponent } from './../../../../systems/health/HealthComponent';
import { World } from 'ecsy';
import { State } from '../Node';
import { Attack } from './Attack';
describe('Attack', () => {
  describe('evaluate', () => {
    const world = new World()
      .registerComponent(AttackComponent)
      .registerComponent(HealthComponent);

    it("should substracts entity's attackDamage from target health", () => {
      const entity = world.createEntity().addComponent(AttackComponent, {
        attackDamage: 10,
      });
      const target = world.createEntity().addComponent(HealthComponent, {
        points: 100,
      });

      const attack = new Attack();
      attack.setData('entity', entity);
      attack.setData('target', target);

      expect(attack.evaluate()).toBe(State.SUCCESS);
      expect(target.getComponent(HealthComponent)!.points).toEqual(90);
    });
  });
});

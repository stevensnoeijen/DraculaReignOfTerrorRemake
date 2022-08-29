import { buildWorld } from 'sim-ecs';
import { World } from 'ecsy';

import { State } from '../Node';

import { AttackComponent } from './../../../../systems/AttackComponent';
import { Attack } from './Attack';

import { SimEcsComponent } from '~/game/systems/SimEcsComponent';
import { Health } from '~/game/components/Health';
describe('Attack', () => {
  describe('evaluate', () => {
    const world = new World()
      .registerComponent(AttackComponent)
      .registerComponent(SimEcsComponent);
    const newWorld = buildWorld().build();

    it("should substracts entity's attackDamage from target health", () => {
      const entity = world.createEntity().addComponent(AttackComponent, {
        attackDamage: 10,
      });
      const target = world.createEntity().addComponent(SimEcsComponent, {
        entity: newWorld.buildEntity().with(new Health({
          points: 100,
          maxPoints: 100,
        })).build(),
      });

      const attack = new Attack();
      attack.setData('entity', entity);
      attack.setData('target', target);

      expect(attack.evaluate()).toBe(State.SUCCESS);
      expect(target.getComponent(SimEcsComponent)!.entity.getComponent(Health)!.points).toEqual(90);
    });
  });
});

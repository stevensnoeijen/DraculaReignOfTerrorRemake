import { buildWorld } from 'sim-ecs';
import { World } from 'ecsy';

import { State } from '../Node';
import { Combat } from '../../../../components/ai/Combat';

import { Attack } from './Attack';

import { getSimComponent } from '~/game/systems/utils';
import { SimEcsComponent } from '~/game/systems/SimEcsComponent';
import { Health } from '~/game/components/Health';

describe('Attack', () => {
  describe('evaluate', () => {
    const world = new World()
      .registerComponent(SimEcsComponent);
    const newWorld = buildWorld().build();

    it("should substracts entity's attackDamage from target health", () => {
      const entity = world.createEntity().addComponent(SimEcsComponent, {
        entity: newWorld.buildEntity()
          .with(new Combat(0, 0, 10))
          .build(),
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
      expect(getSimComponent(target, Health)!.points).toEqual(90);
    });
  });
});

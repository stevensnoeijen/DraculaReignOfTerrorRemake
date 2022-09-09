import { buildWorld } from 'sim-ecs';

import { State } from '../Node';
import { Combat } from '../../../../components/ai/Combat';

import { Attack } from './Attack';

import { Health } from '~/game/components/Health';

describe('Attack', () => {
  describe('evaluate', () => {
    const world = buildWorld().build();

    it("should substracts entity's attackDamage from target health", () => {
      const entity = world.buildEntity()
        .with(new Combat(0, 0, 10, 0))
        .build();
      const target = world.buildEntity()
        .with(new Health({
          points: 100,
          maxPoints: 100,
        }))
        .build();

      const attack = new Attack();
      attack.setData('entity', entity);
      attack.setData('target', target);

      expect(attack.evaluate()).toBe(State.SUCCESS);
      expect(target.getComponent(Health)!.points).toEqual(90);
    });
  });
});

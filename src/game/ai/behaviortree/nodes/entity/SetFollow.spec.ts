import { buildWorld } from 'sim-ecs';
import { Entity, World } from 'ecsy';

import { State } from '../Node';
import { Target } from '../../../../components/ai/Target';
import { SimEcsComponent } from '../../../../systems/SimEcsComponent';
import { getSimComponent } from '../../../../systems/utils/index';

import { SetFollow } from './SetFollow';

import { Follow } from '~/game/components/ai/Follow';


describe('SetFollow', () => {
  describe('evaluate', () => {
    const newWorld = buildWorld().build();
    const world = new World().registerComponent(SimEcsComponent);
    const createEntity = (target: Entity | null = null) =>
      world.createEntity().addComponent(SimEcsComponent, {
        entity: newWorld.buildEntity()
          .with(new Target(target))
          .with(Follow)
          .build(),
      });

    it('should fail when entity has no FollowComponent or TargetComponent', () => {
      const target = createEntity();
      const entity = world.createEntity().addComponent(SimEcsComponent, {
        entity: newWorld.buildEntity().build()
      });

      const follow = new SetFollow();
      follow.setData('entity', entity);

      expect(follow.evaluate()).toBe(State.FAILURE);
    });

    it('should success with setting FollowComponent when with TargetComponent', () => {
      const target = createEntity();
      const entity = createEntity(target);

      const follow = new SetFollow();
      follow.setData('entity', entity);

      expect(follow.evaluate()).toBe(State.SUCCESS);
      expect(getSimComponent(entity, Follow)!.entity).toEqual(target);
    });
  });
});

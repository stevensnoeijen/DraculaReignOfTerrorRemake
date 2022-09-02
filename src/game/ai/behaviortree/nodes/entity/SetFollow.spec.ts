import { buildWorld, IEntity } from 'sim-ecs';

import { State } from '../Node';
import { Target } from '../../../../components/ai/Target';

import { SetFollow } from './SetFollow';

import { Follow } from '~/game/components/ai/Follow';


describe('SetFollow', () => {
  describe('evaluate', () => {
    const world = buildWorld().build();

    const createEntity = (target: IEntity | null = null) =>
      world.buildEntity()
        .with(new Target(target))
        .with(Follow)
        .build();

    it('should fail when entity has no FollowComponent or TargetComponent', () => {
      const entity = world.buildEntity().build();

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
      expect(entity.getComponent(Follow)!.entity).toEqual(target);
    });
  });
});

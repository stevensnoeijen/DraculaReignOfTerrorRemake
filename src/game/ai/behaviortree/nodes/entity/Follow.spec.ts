import { World } from 'ecsy';

import { State } from '../Node';
import { TargetComponent } from '../../../../systems/ai/TargetComponent';
import { FollowComponent } from './../../../../systems/movement/FollowComponent';
import { Follow } from './Follow';

describe('Follow', () => {
  describe('evaluate', () => {
    const world = new World()
      .registerComponent(TargetComponent)
      .registerComponent(FollowComponent);

    it('should fail when entity has no FollowComponent or TargetComponent', () => {
      const target = world.createEntity();
      const entity = world.createEntity();

      const follow = new Follow();
      follow.setData('entity', entity);

      expect(follow.evaluate()).toBe(State.FAILURE);
    });

    it('should success with setting FollowComponent when with TargetComponent', () => {
      const target = world.createEntity();
      const entity = world
        .createEntity()
        .addComponent(TargetComponent, {
          target: target,
        })
        .addComponent(FollowComponent);

      const follow = new Follow();
      follow.setData('entity', entity);

      expect(follow.evaluate()).toBe(State.SUCCESS);
      expect(entity.getComponent(FollowComponent)!.follow).toEqual(target);
    });
  });
});

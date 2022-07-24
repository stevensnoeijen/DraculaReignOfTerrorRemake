import { Entity } from 'ecsy';

import { TransformComponent } from './../../TransformComponent';
import { AssetComponent } from './../AssetComponent';
import { AnimatedSpriteComponent } from './AnimatedSpriteComponent';
import { rotationToDirection, State } from '../../../animation/utils';

export const setEntityAnimation = (entity: Entity, state: State): void => {
  const spriteComponent = entity.getMutableComponent(AnimatedSpriteComponent);
  if (spriteComponent != null) {
    const assetComponent = entity.getComponent(AssetComponent);
    if (assetComponent == null) {
      return;
    }
    const transformComponent = entity.getComponent(TransformComponent);
    const direction = rotationToDirection(transformComponent?.rotation ?? 0)!;

    if (spriteComponent.state !== `${state}_${direction}`) {
      const oldState = spriteComponent.state;
      assetComponent.animations[state][direction].set(spriteComponent.sprite);
      spriteComponent.state = `${state}_${direction}`;
      console.log(
        entity.id +
          ': update state from ' +
          oldState +
          ' to ' +
          spriteComponent.state
      );
      spriteComponent.sprite.play();
    }
  }
};

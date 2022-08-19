import { Entity } from 'ecsy';

import { rotationToDirection } from '../../../animation/load';

import { TransformComponent } from './../../TransformComponent';
import { AssetComponent } from './../AssetComponent';
import { AnimatedSpriteComponent } from './AnimatedSpriteComponent';

import { UnitState } from '~/game/types';

export const setEntityAnimation = (entity: Entity, state: UnitState): void => {
  const spriteComponent = entity.getMutableComponent(AnimatedSpriteComponent);
  if (spriteComponent != null) {
    const assetComponent = entity.getComponent(AssetComponent);
    if (assetComponent == null) {
      return;
    }
    const transformComponent = entity.getComponent(TransformComponent);
    const direction = rotationToDirection(transformComponent?.rotation ?? 0)!;

    if (spriteComponent.state !== `${state}_${direction}`) {
      assetComponent.animator.set(state, direction);
      spriteComponent.state = `${state}_${direction}`;
      spriteComponent.sprite.play();
    }
  }
};

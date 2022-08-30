import { createSystem, queryComponents, Read, ReadOptional, WriteResource } from 'sim-ecs';
import * as PIXI from 'pixi.js';

import { TransformComponent } from '../TransformComponent';

import { EcsyEntity } from '~/game/components/EcsyEntity';

const updateSprite = (app: PIXI.Application, sprite: PIXI.Sprite, ecsyEntity: EcsyEntity) => {
  // FIXME: add is done multiple times, optimise me
  app.stage.addChild(sprite);

  const transformComponent = ecsyEntity.entity.getComponent(TransformComponent);
  if (transformComponent != null) {
    sprite.position.set(
      transformComponent.position.x,
      transformComponent.position.y
    );
  }
};

const updateAnimatedSprite = (app: PIXI.Application, sprite: PIXI.AnimatedSprite, ecsyEntity: EcsyEntity) => {
  // FIXME: add is done multiple times, optimise me
  app.stage.addChild(sprite);

  const transformComponent = ecsyEntity.entity.getComponent(TransformComponent);
  if (transformComponent != null) {
    sprite.position.set(
      transformComponent.position.x,
      transformComponent.position.y
    );
  }
};

export const SpriteSystem = createSystem({
  app: WriteResource(PIXI.Application),
  query: queryComponents({
    sprite: ReadOptional(PIXI.Sprite),
    animatedSprite: ReadOptional(PIXI.AnimatedSprite),
    ecsyEntity: Read(EcsyEntity),
  }),
})
.withRunFunction(({
  app,
  query
}) => {
  query.execute(({ sprite, animatedSprite, ecsyEntity }) => {
    if (sprite != null) updateSprite(app, sprite as PIXI.Sprite, ecsyEntity);
    if (animatedSprite != null)
      updateAnimatedSprite(
        app,
        animatedSprite as PIXI.AnimatedSprite,
        ecsyEntity
      );
  });
})
.build();

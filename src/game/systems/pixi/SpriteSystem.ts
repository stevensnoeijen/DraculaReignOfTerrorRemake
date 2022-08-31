import { createSystem, queryComponents, Read, ReadOptional, WriteResource } from 'sim-ecs';
import * as PIXI from 'pixi.js';

import { TransformComponent } from '../../components/TransformComponent';

const updateSprite = (app: PIXI.Application, sprite: PIXI.Sprite, transform: TransformComponent) => {
  // FIXME: add is done multiple times, optimise me
  app.stage.addChild(sprite);

 sprite.position.set(
    transform.position.x,
    transform.position.y
  );
};

const updateAnimatedSprite = (app: PIXI.Application, sprite: PIXI.AnimatedSprite, transform: TransformComponent) => {
  // FIXME: add is done multiple times, optimise me
  app.stage.addChild(sprite);

  sprite.position.set(
    transform.position.x,
    transform.position.y
  );
};

export const SpriteSystem = createSystem({
  app: WriteResource(PIXI.Application),
  query: queryComponents({
    sprite: ReadOptional(PIXI.Sprite),
    animatedSprite: ReadOptional(PIXI.AnimatedSprite),
    transform: Read(TransformComponent),
  }),
})
.withRunFunction(({
  app,
  query
}) => {
  query.execute(({ sprite, animatedSprite, transform, }) => {
    if (sprite != null) updateSprite(app, sprite as PIXI.Sprite, transform);
    if (animatedSprite != null)
      updateAnimatedSprite(
        app,
        animatedSprite as PIXI.AnimatedSprite,
        transform
      );
  });
})
.build();

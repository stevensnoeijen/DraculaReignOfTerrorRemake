import { createSystem, queryComponents, Read, ReadOptional, WriteResource, ReadEvents, EntityAdded } from 'sim-ecs';
import * as PIXI from 'pixi.js';

import { Transform } from '../../components/Transform';

import { Alive } from '~/game/components/Alive';

let aliveLayer: PIXI.Container;

const updatePosition = (sprite: PIXI.AnimatedSprite | PIXI.Sprite, transform: Transform) => {
  sprite.position.set(
    transform.position.x,
    transform.position.y
  );
};

export const SpriteRenderSystem = createSystem({
  app: WriteResource(PIXI.Application),
  entityAdded: ReadEvents(EntityAdded),
  query: queryComponents({
    sprite: ReadOptional(PIXI.Sprite),
    animatedSprite: ReadOptional(PIXI.AnimatedSprite),
    transform: Read(Transform),
    alive: Read(Alive),
  }),
})
.withSetupFunction(({ app }) => {
  aliveLayer = app.stage.addChildAt(new PIXI.Container(), 1);
})
.withRunFunction(({
  entityAdded,
  query,
}) => {
  entityAdded.execute(event => {
    if (event.entity.hasComponent(PIXI.Sprite))
      aliveLayer.addChild(event.entity.getComponent(PIXI.Sprite)!);

    if (event.entity.hasComponent(PIXI.AnimatedSprite))
      aliveLayer.addChild(event.entity.getComponent(PIXI.AnimatedSprite)!);
  });

  query.execute(({ sprite, animatedSprite, transform, alive }) => {
    if (sprite != null) updatePosition(sprite as PIXI.Sprite, transform);
    if (animatedSprite != null)
      updatePosition(
        animatedSprite as PIXI.AnimatedSprite,
        transform,
      );
  });
})
.build();

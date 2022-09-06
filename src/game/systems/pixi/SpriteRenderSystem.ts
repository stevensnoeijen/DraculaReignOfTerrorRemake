import { createSystem, queryComponents, Read, ReadOptional, WriteResource, ReadEvents, EntityAdded } from 'sim-ecs';
import * as PIXI from 'pixi.js';

import { Transform } from '../../components/Transform';

import { Alive } from '~/game/components/Alive';
import { Died } from '~/game/events/Died';

let aliveLayer: PIXI.Container;
let deadLayer: PIXI.Container;

const updatePosition = (sprite: PIXI.AnimatedSprite | PIXI.Sprite, transform: Transform) => {
  sprite.position.set(
    transform.position.x,
    transform.position.y
  );
};

export const SpriteRenderSystem = createSystem({
  app: WriteResource(PIXI.Application),
  entityAdded: ReadEvents(EntityAdded),
  died: ReadEvents(Died),

  query: queryComponents({
    sprite: ReadOptional(PIXI.Sprite),
    animatedSprite: ReadOptional(PIXI.AnimatedSprite),
    transform: Read(Transform),
  }),
})
.withSetupFunction(({ app }) => {
  deadLayer = app.stage.addChildAt(new PIXI.Container(), 0);
  aliveLayer = app.stage.addChildAt(new PIXI.Container(), 1);
})
.withRunFunction(({
  entityAdded,
  died,
  query,
}) => {
  entityAdded.execute(event => {
    if (event.entity.hasComponent(PIXI.Sprite))
      aliveLayer.addChild(event.entity.getComponent(PIXI.Sprite)!);

    if (event.entity.hasComponent(PIXI.AnimatedSprite))
      aliveLayer.addChild(event.entity.getComponent(PIXI.AnimatedSprite)!);
  });

  died.execute(event => {
    if (event.entity.hasComponent(Alive)) {
      let sprite: PIXI.Sprite | null = null;
      if (event.entity.hasComponent(PIXI.Sprite))
        sprite = event.entity.getComponent(PIXI.Sprite)!;
      if (event.entity.hasComponent(PIXI.AnimatedSprite))
        sprite = event.entity.getComponent(PIXI.AnimatedSprite)!;

      if (sprite == null) return;

      aliveLayer.removeChild(sprite!);
      deadLayer.addChild(sprite!);
    }
  });

  query.execute(({ sprite, animatedSprite, transform }) => {
    if (sprite != null) updatePosition(sprite as PIXI.Sprite, transform);

    if (animatedSprite != null) updatePosition(animatedSprite as PIXI.AnimatedSprite, transform);
  });
})
.build();

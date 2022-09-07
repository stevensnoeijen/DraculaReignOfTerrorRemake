import { createSystem, queryComponents, Read, WriteResource, ReadEvents, EntityAdded, EntityRemoved } from 'sim-ecs';
import * as PIXI from 'pixi.js';

import { Transform } from '../../components/Transform';

import { DEAD_LAYER, ALIVE_LAYER } from './layers';

import { isAlive } from '~/game/utils/components';
import { Alive } from '~/game/components/Alive';
import { Died } from '~/game/events/Died';
import { SpriteRender } from '~/game/components/render/SpriteRender';

let aliveLayer: PIXI.Container;
let deadLayer: PIXI.Container;

const updatePosition = (sprite: PIXI.Sprite, transform: Transform) => {
  sprite.position.set(
    transform.position.x,
    transform.position.y
  );
};

export const SpriteRenderSystem = createSystem({
  app: WriteResource(PIXI.Application),

  entityAdded: ReadEvents(EntityAdded),
  entityRemoved: ReadEvents(EntityRemoved),
  died: ReadEvents(Died),

  query: queryComponents({
    spriteRender: Read(SpriteRender),
    transform: Read(Transform),
  }),
})
.withSetupFunction(({ app }) => {
  deadLayer = app.stage.addChildAt(new PIXI.Container(), DEAD_LAYER);
  aliveLayer = app.stage.addChildAt(new PIXI.Container(), ALIVE_LAYER);
})
.withRunFunction(({
  entityAdded,
  entityRemoved,
  died,
  query,
}) => {
  entityAdded.execute(event => {
    if (event.entity.hasComponent(SpriteRender)) {
      const sprite = event.entity.getComponent(SpriteRender)!.sprite;
      if (isAlive(event.entity))
        aliveLayer.addChild(sprite);
      else
        deadLayer.addChild(sprite);
    }
  });

  entityRemoved.execute(event => {
    if (event.entity.hasComponent(SpriteRender)) {
      const sprite = event.entity.getComponent(SpriteRender)!.sprite;
      if (isAlive(event.entity))
        aliveLayer.removeChild(sprite);
      else
        deadLayer.removeChild(sprite);
    }
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

  query.execute(({ spriteRender, transform }) => {
    updatePosition(spriteRender.sprite, transform);
  });
})
.build();

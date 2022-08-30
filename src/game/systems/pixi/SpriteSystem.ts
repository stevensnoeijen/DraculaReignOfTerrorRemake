import { createSystem, queryComponents, Read, WriteResource } from 'sim-ecs';
import * as PIXI from 'pixi.js';

import { TransformComponent } from '../TransformComponent';

import { SimEcsComponent } from './../SimEcsComponent';

export const SpriteSystem = createSystem({
  app: WriteResource(PIXI.Application),
  query: queryComponents({
    sprite: Read(PIXI.Sprite),
    transform: Read(SimEcsComponent),
  }),
})
.withRunFunction(({
  app,
  query
}) => {
  query.execute(({ sprite, transform }) => {
    if (sprite != null) {
      // FIXME: add is done multiple times, optimise me
      app.stage.addChild(sprite as PIXI.Sprite);

      const transformComponent = transform.entity.getComponent(TransformComponent);
      if (transformComponent != null) {
        sprite.position.set(
          transformComponent.position.x,
          transformComponent.position.y
        );
      }
    }
  });
})
.build();

import { createSystem, ReadResource } from 'sim-ecs';
import * as PIXI from 'pixi.js';

import { MAP_LAYER } from './layers';
import { cellPositionToVector } from './../../utils';

import { EventBus } from '~/game/EventBus';
import { ScenarioLoadedEvent } from '~/game/Events';

let collsionMap: number[][] | null = null;
const graphics = new PIXI.Graphics();

const draw = () => {
  if (collsionMap == null) {
    return;
  }

  graphics.clear();


  graphics.beginFill(0x000000);

  collsionMap.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell == 1) {
        const vector = cellPositionToVector(x, y);
        graphics.drawRect(vector.x - 8, vector.y - 8, 16, 16);
      }
    });
  });
  graphics.endFill();
};

export const MapRenderSystem = createSystem({
  eventBus: ReadResource(EventBus),
  app: ReadResource(PIXI.Application),
})
.withSetupFunction(({ eventBus, app }) => {
  eventBus.on<ScenarioLoadedEvent>('scenario:loaded', (event) => {
    collsionMap = event.detail.scenario.collisionMap;
  });

  app.stage.addChildAt(graphics, MAP_LAYER);
})
.withRunFunction(() => {
  draw();
})
.build();

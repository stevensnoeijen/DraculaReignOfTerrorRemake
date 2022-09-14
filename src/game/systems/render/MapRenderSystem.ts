import { createSystem, ReadResource } from 'sim-ecs';
import * as PIXI from 'pixi.js';

import { MAP_LAYER } from './layers';

import { ScenarioLoaded } from '~/game/events/ScenarioLoaded';
import { cellPositionToVector } from '~/game/utils/grid';
import { worldEventBus } from '~/game/constants';

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
  app: ReadResource(PIXI.Application),
})
  .withSetupFunction(({ app }) => {
    worldEventBus.subscribe(ScenarioLoaded, (event) => {
      collsionMap = event.scenario.collisionMap;
    });

    app.stage.addChildAt(graphics, MAP_LAYER);
  })
  .withRunFunction(() => {
    draw();
  })
  .build();

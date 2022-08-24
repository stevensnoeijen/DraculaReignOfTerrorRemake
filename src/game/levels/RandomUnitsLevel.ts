import * as PIXI from 'pixi.js';

import { Constants } from '../Constants';
import { EntityFactory } from '../EntityFactory';
import { Vector2 } from '../math/Vector2';
import { toWorldPositionCellCenter } from '../utils';
import { AnimationModelsJson } from '../animation/api';
import { AnimationService } from '../animation/AnimationService';
import { Engine } from '../Engine';

import { createEmptyGrid, getGridSizeByScreen } from './utils';
import { Level } from './Level';

export class RandomUnitsLevel extends Level {
  private readonly _collisionMap: number[][];
  private readonly entityFactory: EntityFactory;

  private readonly animationService: AnimationService;

  constructor(app: PIXI.Application, engine: Engine) {
    super(app, engine);

    this._collisionMap = createEmptyGrid(getGridSizeByScreen(app));

    this.animationService = new AnimationService(
      app.loader.resources['unit-spritesheet'].spritesheet!,
      app.loader.resources['animation-models'].data as AnimationModelsJson
    );
    this.entityFactory = new EntityFactory(engine.world, this.animationService);
  }

  public get collisionMap(): number[][] {
    return this._collisionMap;
  }

  public load(): void {
    Array.from(Array(100)).forEach(() => {
      const vector = toWorldPositionCellCenter(
        new Vector2(
          Math.round(Math.random() * this.app.screen.width),
          Math.round(Math.random() * this.app.screen.height) +
            Constants.CELL_SIZE / 2
        )
      );

      this.entityFactory.createUnit({
        position: vector,
        color: 'red',
        team: {
          number: Math.round(Math.random() + 1),
        },
      });
    });
  }
}

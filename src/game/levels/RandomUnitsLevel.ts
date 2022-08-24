import * as PIXI from 'pixi.js';

import { Constants } from '../Constants';
import { Vector2 } from '../math/Vector2';
import { toWorldPositionCellCenter } from '../utils';
import { Engine } from '../Engine';

import { createEmptyGrid, getGridSizeByScreen } from './utils';
import { Level } from './Level';

export class RandomUnitsLevel extends Level {
  private readonly _collisionMap: number[][];

  constructor(app: PIXI.Application, engine: Engine) {
    super(app, engine);

    this._collisionMap = createEmptyGrid(getGridSizeByScreen(app));
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

      this.engine.entityFactory.createUnit({
        position: vector,
        color: 'red',
        team: {
          number: Math.round(Math.random() + 1),
        },
      });
    });
  }
}

import * as PIXI from 'pixi.js';

import { Constants } from '../Constants';
import { Vector2 } from '../math/Vector2';
import { toWorldPositionCellCenter } from '../utils';
import { Engine } from '../Engine';

import { UNIT_SWORDSMEN } from './../objects/constants';
import { EntityLoader } from './../EntityLoader';
import { createEmptyGrid, getGridSizeByScreen } from './utils';
import { Scenario } from './Scenario';

export class RandomUnitsScenario extends Scenario {
  private readonly _collisionMap: number[][];

  constructor(app: PIXI.Application, engine: Engine) {
    super(app, engine);

    this._collisionMap = createEmptyGrid(getGridSizeByScreen(app));
  }

  public get collisionMap(): number[][] {
    return this._collisionMap;
  }

  public load(entityLoader: EntityLoader): void {
    Array.from(Array(100)).forEach(() => {
      const vector = toWorldPositionCellCenter(
        new Vector2(
          Math.round(Math.random() * this.app.screen.width),
          Math.round(Math.random() * this.app.screen.height) +
            Constants.CELL_SIZE / 2
        )
      );

      entityLoader.createUnit(UNIT_SWORDSMEN, {
        position: vector,
        color: 'red',
        team: {
          number: Math.round(Math.random() + 1),
        },
      });
    });
  }
}
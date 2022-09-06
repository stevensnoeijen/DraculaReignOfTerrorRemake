import * as PIXI from 'pixi.js';

import { Engine } from '../Engine';
import { cellPositionToVector } from '../utils';

import { UNIT_SWORDSMEN } from './../objects/constants';
import { EntityLoader } from './../EntityLoader';
import { Scenario } from './Scenario';
import { generateMaze, getGridSizeByScreen } from './utils';

export class PathFindingScenario extends Scenario {
  private map: number[][];

  constructor(app: PIXI.Application, engine: Engine) {
    super(app, engine);

    this.map = generateMaze(getGridSizeByScreen(app));
  }

  public get collisionMap(): number[][] {
    return this.map;
  }

  public load(entityLoader: EntityLoader): void {
    entityLoader.createUnit(UNIT_SWORDSMEN, {
      position: cellPositionToVector(1, 1),
      color: 'blue',
      team: {
        number: 1,
      },
    });

    entityLoader.createUnit(UNIT_SWORDSMEN, {
      position: cellPositionToVector(3, 1),
      color: 'red',
      team: {
        number: 2,
      },
    });
  }
}


import { Engine } from '../Engine';
import { cellPositionToVector } from '../utils';
import { UNIT_SWORDSMEN } from '../data/constants';

import { EntityLoader } from './../EntityLoader';
import { Scenario } from './Scenario';
import { generateMaze, getGridSizeByScreen } from './utils';

export class PathFindingScenario extends Scenario {
  private map: number[][];

  constructor(engine: Engine) {
    super(engine);

    this.map = generateMaze(getGridSizeByScreen(engine.app));
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

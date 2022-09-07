
import { Engine } from '../Engine';
import { cellPositionToVector } from '../utils/grid';
import { UNIT_SWORDSMEN } from '../data/constants';
import { Team } from '../components/Team';

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
      team: Team.PLAYER,
    });

    entityLoader.createUnit(UNIT_SWORDSMEN, {
      position: cellPositionToVector(3, 1),
      team: Team.CPU,
    });
  }
}

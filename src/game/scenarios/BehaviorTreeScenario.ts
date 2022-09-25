import { cellPositionToVector } from '../utils/grid';
import { Engine } from '../Engine';
import { UNIT_SWORDSMEN } from '../data/constants';
import { Team } from '../components/Team';

import { EntityLoader } from './../EntityLoader';
import {
  createEmptyGrid,
  getGridSizeByScreen,
  addSurroundingCollision,
} from './utils';
import { Scenario } from './Scenario';

export class BehaviorTreeScenario extends Scenario {
  private map: number[][];

  constructor(engine: Engine) {
    super(engine);

    this.map = createEmptyGrid(getGridSizeByScreen(engine.app));
    addSurroundingCollision(this.map);
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
      position: cellPositionToVector(10, 10),
      team: Team.CPU,
    });
  }
}

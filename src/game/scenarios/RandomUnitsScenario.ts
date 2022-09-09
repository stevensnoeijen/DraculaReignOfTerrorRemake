
import { CELL_SIZE } from '../constants';
import { Vector2 } from '../math/Vector2';
import { toWorldPositionCellCenter } from '../utils/grid';
import { Engine } from '../Engine';
import { UNIT_SWORDSMEN } from '../data/constants';

import { EntityLoader } from './../EntityLoader';
import { createEmptyGrid, getGridSizeByScreen } from './utils';
import { Scenario } from './Scenario';

import { Team } from '~/game/components/Team';
import { getRandomValue } from '~/utils/array';

export class RandomUnitsScenario extends Scenario {
  private readonly _collisionMap: number[][];

  constructor(engine: Engine) {
    super(engine);

    this._collisionMap = createEmptyGrid(getGridSizeByScreen(engine.app));
  }

  public get collisionMap(): number[][] {
    return this._collisionMap;
  }

  public load(entityLoader: EntityLoader): void {
    Array.from(Array(100)).forEach(() => {
      const vector = toWorldPositionCellCenter(
        new Vector2(
          Math.round(Math.random() * this.engine.app.screen.width),
          Math.round(Math.random() * this.engine.app.screen.height) +
            CELL_SIZE / 2
        )
      );

      entityLoader.createUnit(UNIT_SWORDSMEN, {
        position: vector,
        team: getRandomValue([Team.PLAYER, Team.CPU])
      });
    });
  }
}

import { CELL_SIZE } from '../constants';
import { Vector2 } from '../math/Vector2';
import { toWorldPositionCellCenter } from '../utils/grid';
import { Engine } from '../Engine';
import { UNIT_SWORDSMEN } from '../data/constants';

import { EntityLoader } from './../EntityLoader';
import {
  addSurroundingCollision,
  createEmptyGrid,
  getGridSizeByScreen,
} from './utils';
import { Scenario } from './Scenario';

import { Team } from '~/game/components/Team';
import { getRandomValue } from '~/utils/array';

const OFFSET = CELL_SIZE * 2;

export class RandomUnitsScenario extends Scenario {
  private readonly _collisionMap: number[][];

  constructor(engine: Engine) {
    super(engine);

    this._collisionMap = createEmptyGrid(getGridSizeByScreen(engine.app));
    addSurroundingCollision(this._collisionMap);
  }

  public get collisionMap(): number[][] {
    return this._collisionMap;
  }

  public load(entityLoader: EntityLoader): void {
    Array.from(Array(50)).forEach(() => {
      const vector = toWorldPositionCellCenter(
        new Vector2(
          OFFSET +
            Math.round(
              Math.random() * (this.engine.app.screen.width - OFFSET * 2)
            ),
          OFFSET +
            Math.round(
              Math.random() * (this.engine.app.screen.height - OFFSET * 2)
            ) +
            CELL_SIZE / 2
        )
      );

      entityLoader.createUnit(UNIT_SWORDSMEN, {
        position: vector,
        team: getRandomValue([Team.PLAYER, Team.CPU]),
      });
    });
  }
}

import * as PIXI from 'pixi.js';

import { Engine } from '../Engine';

import { cellPositionToVector } from './../utils';
import { Level } from './Level';
import { EntityFactory } from './../EntityFactory';
import { generateMaze, getGridSizeByScreen } from './utils';

export class PathFindingLevel extends Level {
  private map: number[][];
  private readonly entityFactory: EntityFactory;

  constructor(app: PIXI.Application, engine: Engine) {
    super(app, engine);

    this.map = generateMaze(getGridSizeByScreen(app));

    this.entityFactory = new EntityFactory(engine.world, engine.animationService);
  }

  public get collisionMap(): number[][] {
    return this.map;
  }

  public load(): void {
    this.entityFactory.createUnit({
      position: cellPositionToVector(1, 1),
      color: 'blue',
      team: {
        number: 1,
      },
    });

    this.entityFactory.createUnit({
      position: cellPositionToVector(3, 1),
      color: 'red',
      team: {
        number: 2,
      },
    });
  }
}

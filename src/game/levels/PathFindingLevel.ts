import * as PIXI from 'pixi.js';
import { World } from 'ecsy';

import { cellPositionToVector } from './../utils';
import { Level } from './Level';
import { EntityFactory } from './../EntityFactory';
import { generateMaze, getGridSizeByScreen } from './utils';
import * as animations from '../animation/utils';

export class PathFindingLevel extends Level {
  private map: number[][];
  private readonly entityFactory: EntityFactory;

  public readonly unitAnimations: animations.UnitAnimations;

  constructor(app: PIXI.Application, world: World) {
    super(app, world);

    this.map = generateMaze(getGridSizeByScreen(app));

    this.unitAnimations = animations.load(
      app.loader.resources.unit.spritesheet!
    );
    this.entityFactory = new EntityFactory(world, this.unitAnimations);
  }

  public get collisionMap(): number[][] {
    return this.map;
  }

  public load(): void {
    this.entityFactory.createUnit({
      position: cellPositionToVector(1, 1),
      color: 'red',
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

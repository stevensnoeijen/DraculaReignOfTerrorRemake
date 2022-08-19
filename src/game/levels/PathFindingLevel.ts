import * as PIXI from 'pixi.js';
import { World } from 'ecsy';

import { AnimationService } from '../animation/AnimationService';
import { AnimationModelsJson } from '../animation/api';

import { cellPositionToVector } from './../utils';
import { Level } from './Level';
import { EntityFactory } from './../EntityFactory';
import { generateMaze, getGridSizeByScreen } from './utils';

export class PathFindingLevel extends Level {
  private map: number[][];
  private readonly entityFactory: EntityFactory;
  private readonly animationService: AnimationService;

  constructor(app: PIXI.Application, world: World) {
    super(app, world);

    this.map = generateMaze(getGridSizeByScreen(app));

    this.animationService = new AnimationService(
      app.loader.resources['unit-spritesheet'].spritesheet!,
      app.loader.resources['animation-models'].data as AnimationModelsJson
    );
    this.entityFactory = new EntityFactory(world, this.animationService);
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

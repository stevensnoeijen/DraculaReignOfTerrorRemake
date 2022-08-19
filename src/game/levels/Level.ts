import { World } from 'ecsy';
import * as PIXI from 'pixi.js';

export abstract class Level {
  abstract get collisionMap(): number[][];

  constructor(
    protected readonly app: PIXI.Application,
    protected readonly world: World
  ) {}

  abstract load(app: PIXI.Application, world: World): void;
}

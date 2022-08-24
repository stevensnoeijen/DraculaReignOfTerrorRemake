import * as PIXI from 'pixi.js';

import { Engine } from '../Engine';

export abstract class Level {
  abstract get collisionMap(): number[][];

  constructor(
    protected readonly app: PIXI.Application,
    protected readonly engine: Engine
  ) {}

  abstract load(): void;
}

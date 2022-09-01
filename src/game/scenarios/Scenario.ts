import * as PIXI from 'pixi.js';

import { Engine } from '../Engine';

export abstract class Scenario {
  abstract get collisionMap(): number[][];

  constructor(
    protected readonly app: PIXI.Application,
    protected readonly engine: Engine
  ) {}

  abstract load(): void;
}

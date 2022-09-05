import * as PIXI from 'pixi.js';

import { Engine } from '../Engine';
import { EntityLoader } from '../EntityLoader';

export abstract class Scenario {
  abstract get collisionMap(): number[][];

  constructor(
    protected readonly app: PIXI.Application,
    protected readonly engine: Engine
  ) {}

  abstract load(entityLoader: EntityLoader): void;
}

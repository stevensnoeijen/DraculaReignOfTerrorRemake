
import { Engine } from '../Engine';
import { EntityLoader } from '../EntityLoader';

export abstract class Scenario {
  abstract get collisionMap(): number[][];

  constructor(
    protected readonly engine: Engine
  ) {}

  abstract load(entityLoader: EntityLoader): void;
}

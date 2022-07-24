import { World } from 'ecsy';
import * as PIXI from 'pixi.js';
import { UnitAnimations } from '../animation/utils';

export abstract class Level {
  abstract get collisionMap(): number[][];
  abstract get unitAnimations(): UnitAnimations;

  constructor(
    protected readonly app: PIXI.Application,
    protected readonly world: World
  ) {}

  abstract load(app: PIXI.Application, world: World): void;
}

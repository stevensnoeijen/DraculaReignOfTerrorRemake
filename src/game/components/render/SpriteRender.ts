import * as PIXI from 'pixi.js';

import { Size } from '~/game/math/types';

export class SpriteRender {
  constructor(
    public readonly sprite: PIXI.Sprite,
    public readonly size: Size | null = null
  ) {}
}

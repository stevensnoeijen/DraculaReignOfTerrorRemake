import * as PIXI from 'pixi.js';

import { Color, createAnimationMap, Unit } from './utils';
import { Animator } from './Animator';
import { UnitSpriteModelsJson } from './api';
import { SpriteModel } from './SpriteModel';

export class AnimationManager {
  constructor(
    private readonly spritesheet: PIXI.Spritesheet,
    private readonly spriteModels: UnitSpriteModelsJson
  ) {}

  public createModel(color: Color, unit: Unit): SpriteModel {
    return new SpriteModel(
      `${color}_${unit}`,
      createAnimationMap(
        this.spritesheet,
        this.spriteModels.models,
        color,
        unit
      )
    );
  }

  public createAnimator(
    sprite: PIXI.AnimatedSprite,
    color: Color,
    unit: Unit
  ): Animator {
    return new Animator(sprite, this.createModel(color, unit));
  }
}

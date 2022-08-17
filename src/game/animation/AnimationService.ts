import * as PIXI from 'pixi.js';

import { Color, createAnimationMap, createModelName, Unit } from './utils';
import { Animator } from './Animator';
import { UnitSpriteModelsJson } from './api';
import { AnimationModel } from './AnimationModel';

export class AnimationService {
  private readonly modelsCache = new Map<string, AnimationModel>();

  constructor(
    private readonly spritesheet: PIXI.Spritesheet,
    private readonly spriteModels: UnitSpriteModelsJson
  ) {}

  private createModel(color: Color, unit: Unit): AnimationModel {
    return new AnimationModel(
      `${color}_${unit}`,
      createAnimationMap(
        this.spritesheet,
        this.spriteModels.models,
        color,
        unit
      )
    );
  }

  private getModel(color: Color, unit: Unit): AnimationModel {
    const modelName = createModelName(color, unit);
    if (!this.modelsCache.has(modelName)) {
      this.modelsCache.set(modelName, this.createModel(color, unit));
    }
    return this.modelsCache.get(modelName)!;
  }

  public createAnimator(
    sprite: PIXI.AnimatedSprite,
    color: Color,
    unit: Unit
  ): Animator {
    return new Animator(sprite, this.getModel(color, unit));
  }
}

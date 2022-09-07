import * as PIXI from 'pixi.js';

import { TeamColor, UnitType } from '../types';
import { Animations } from '../components/Animations';

import { createAnimationMap, createModelName } from './load';
import { Animator } from './Animator';
import { AnimationModelsJson } from './api';
import { AnimationModel } from './AnimationModel';

export class AnimationService {
  private readonly modelsCache = new Map<string, AnimationModel>();

  constructor(
    private readonly spritesheet: PIXI.Spritesheet,
    private readonly animationModels: AnimationModelsJson
  ) {}

  private createModel(color: TeamColor, unit: UnitType): AnimationModel {
    return new AnimationModel(
      `${color}_${unit}`,
      createAnimationMap(
        this.spritesheet,
        this.animationModels.models,
        color,
        unit
      )
    );
  }

  private getModel(color: TeamColor, unit: UnitType): AnimationModel {
    const modelName = createModelName(color, unit);
    if (!this.modelsCache.has(modelName)) {
      this.modelsCache.set(modelName, this.createModel(color, unit));
    }
    return this.modelsCache.get(modelName)!;
  }

  private createAnimator(
    sprite: PIXI.AnimatedSprite,
    color: TeamColor,
    unit: UnitType
  ): Animator {
    return new Animator(sprite, this.getModel(color, unit));
  }

  public createComponent(
    sprite: PIXI.AnimatedSprite,
    color: TeamColor,
    unit: UnitType): Animations {
    return new Animations(this.createAnimator(sprite, color, unit));
  }
}

import * as PIXI from 'pixi.js';

import * as animations from './utils';
import { Animator } from './Animator';
import { Model } from './Model';

export class AnimationManager {
  private readonly unitAnimations: animations.UnitAnimations;

  constructor(spritesheet: PIXI.Spritesheet) {
    this.unitAnimations = animations.load(spritesheet);
  }

  public getModel(color: animations.Color, unit: animations.Unit): Model {
    return new Model(`${color}_${unit}`, this.unitAnimations[color][unit]);
  }

  public createAnimator(
    sprite: PIXI.AnimatedSprite,
    color: animations.Color,
    unit: animations.Unit
  ): Animator {
    return new Animator(sprite, this.getModel(color, unit));
  }
}

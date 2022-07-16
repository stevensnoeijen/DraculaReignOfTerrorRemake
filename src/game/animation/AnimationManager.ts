import * as PIXI from 'pixi.js';

import * as animations from './utils';
import { Animator } from './Animator';

export class AnimationManager {
  private readonly unitAnimations: animations.UnitAnimations;

  constructor(spritesheet: PIXI.Spritesheet) {
    this.unitAnimations = animations.load(spritesheet);
  }

  public getSkin (color: animations.Color, unit: animations.Unit): animations.Animations {
    return this.unitAnimations[color][unit];
  }

  public createAnimator(sprite: PIXI.AnimatedSprite, color: animations.Color, unit: animations.Unit): Animator {
    return new Animator(sprite, this.getSkin(color, unit));
  }
}
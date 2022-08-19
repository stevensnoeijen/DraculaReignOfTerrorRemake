import { AnimatedSprite } from 'pixi.js';

import { MoveDirection, UnitState } from '../types';

import { AnimationModel } from './AnimationModel';
export class Animator {
  constructor(
    public readonly sprite: AnimatedSprite,
    public readonly model: AnimationModel
  ) {}

  public set(state: UnitState, direction: MoveDirection): void {
    const animation = this.model.getAnimation(state, direction);
    animation.set(this.sprite);
  }
}

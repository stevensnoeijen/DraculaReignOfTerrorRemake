import { AnimatedSprite } from 'pixi.js';

import { MoveDirection, UnitState } from '../types';

import { AnimationModel } from './AnimationModel';
export class Animator {
  private currentState: UnitState= 'idle';
  private currentDirection: MoveDirection = 'north';

  constructor(
    public readonly sprite: AnimatedSprite,
    public readonly model: AnimationModel
  ) {}

  public set(state: UnitState, direction: MoveDirection): void {
    if (this.isStateChanged(state, direction)) {
      const animation = this.model.getAnimation(state, direction);
      animation.set(this.sprite);

      this.currentState = state;
      this.currentDirection = direction;
    }
  }

  private isStateChanged (state: UnitState, direction: MoveDirection): boolean {
    return this.currentState !== state || this.currentDirection != direction;
  }
}

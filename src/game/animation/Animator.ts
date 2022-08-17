import { AnimatedSprite } from 'pixi.js';

import { AnimationModel } from './AnimationModel';
import { Direction, State } from './utils';

export class Animator {
  constructor(
    public readonly sprite: AnimatedSprite,
    public readonly model: AnimationModel
  ) {}

  public set(state: State, direction: Direction): void {
    const animation = this.model.getAnimation(state, direction);
    animation.set(this.sprite);
  }
}

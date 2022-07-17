import { AnimatedSprite } from "pixi.js";
import { Model } from "./Model";

import { Direction, State } from "./utils";

export class Animator {
  constructor(
    public readonly sprite: AnimatedSprite,
    private readonly model: Model) {
  }

  public set(state: State, direction: Direction): void {
    const animation = this.model.getAnimation(state, direction);
    animation.set(this.sprite);
  }
}
import { AnimatedSprite } from "pixi.js";

import { Animations, Direction, State } from "./utils";

export class Animator {
  constructor(
    public readonly sprite: AnimatedSprite,
    private readonly skin: Animations) {
  }

  public set(state: State, direction: Direction): void {
    const animation = this.skin[state][direction];
    animation.set(this.sprite);
  }
}
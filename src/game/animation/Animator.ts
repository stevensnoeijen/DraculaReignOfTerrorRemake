import { AnimatedSprite } from "pixi.js";

import { Animations, Direction, State } from "../animations";

export class Animator {
  constructor(
    public readonly sprite: AnimatedSprite,
    private readonly skin: Animations) {
  }

  public set(state: State, direction: Direction): void {
    this.sprite.textures = this.skin[state][direction];
    this.sprite.play();
  }
}
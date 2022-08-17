import { Animation } from './Animation';
import { AnimationMap, Direction, State } from './utils';

export class SpriteModel {
  constructor(
    public readonly name: string,
    private readonly animations: AnimationMap
  ) {}

  public getAnimation(state: State, direction: Direction): Animation {
    return this.animations[state][direction];
  }
}

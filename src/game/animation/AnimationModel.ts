import { Animation } from './Animation';
import { AnimationMap, Direction, State } from './utils';

export class AnimationModel {
  constructor(
    public readonly name: string,
    private readonly map: AnimationMap
  ) {}

  public getAnimation(state: State, direction: Direction): Animation {
    return this.map[state][direction];
  }
}

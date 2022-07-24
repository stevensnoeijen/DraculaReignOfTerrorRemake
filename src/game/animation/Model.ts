import { Animation } from './Animation';
import { Direction, State } from './utils';

export class Model {
  constructor(
    public readonly name: string,
    private readonly animations: Record<State, Record<Direction, Animation>>
  ) {}

  public getAnimation(state: State, direction: Direction): Animation {
    return this.animations[state][direction];
  }
}

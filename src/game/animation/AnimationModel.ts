import { UnitState } from '../types';

import { MoveDirection } from './../types';
import { Animation } from './Animation';
import { AnimationMap } from './load';

export class AnimationModel {
  constructor(
    public readonly name: string,
    private readonly map: AnimationMap
  ) {}

  public getAnimation(state: UnitState, direction: MoveDirection): Animation {
    return this.map[state][direction];
  }
}

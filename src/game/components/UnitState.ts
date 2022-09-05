import { UnitState as State } from './../types';

export class UnitState {
  constructor(
    public state: State = 'idle',
  ) {}
}

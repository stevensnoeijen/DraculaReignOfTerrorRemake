enum State {
  Idle,
  Move,
  Combat,
  Dying,
  Dead
}

export class UnitState {
  state: State = State.Idle;
}

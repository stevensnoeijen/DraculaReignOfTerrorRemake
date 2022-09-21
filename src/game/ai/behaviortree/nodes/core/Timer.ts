import { IValue } from '../../values/IValue';
import { Node, State } from '../Node';

import { GameTime } from './../../../../GameTime';

type ElapsedCallback = () => void;

type TimerProps = {
  delay: IValue<number>;
  /**
   * Time already passed.
   * So that the timer is executed earlier as usual or later (negative value).
   */
  passedTime?: IValue<number>;
  elapsedCallback?: ElapsedCallback | null;
  execute: Node;
};

export class Timer extends Node {
  public readonly delay: IValue<number>;
  public readonly elapsedCallback: ElapsedCallback | null;
  private _countdownTimer: number;

  constructor(props: TimerProps) {
    super([props.execute]);

    this.delay = props.delay;
    this._countdownTimer = props.passedTime?.value ?? this.delay.value;
    this.elapsedCallback = props.elapsedCallback ?? null;
  }

  public get countdownTimer() {
    return this._countdownTimer;
  }

  public isElapsed(): boolean {
    return this.countdownTimer <= 0;
  }

  public reset(): void {
    this._countdownTimer = this.delay.value;
  }

  public evaluate(): State {
    if (this.isElapsed()) {
      this.reset();
    }

    if (!this.hasChildren()) {
      return this.failure();
    }
    this._countdownTimer -= GameTime.delta;

    if (this.isElapsed()) {
      this.state = this.children[0].evaluate();
      if (this.elapsedCallback) {
        this.elapsedCallback();
      }

      return this.state;
    } else {
      return this.running();
    }
  }
}

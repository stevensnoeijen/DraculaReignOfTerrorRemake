import { GameTime } from './../../../../GameTime';
import { Node, State } from "../Node";

type ElapsedCallback = () => void;

type TimerProps = {
    delay: number;
    elapsedCallback?: ElapsedCallback|null;
    children?: Node[];
};

export class Timer extends Node {
    public readonly delay: number;
    public readonly elapsedCallback: ElapsedCallback|null;
    private _countdownTimer: number;

    constructor(props: TimerProps) {
        super(props.children);
        
        this.delay = props.delay;
        this._countdownTimer = this.delay;
        this.elapsedCallback = props.elapsedCallback ?? null;
    }

    public get countdownTimer () {
        return this._countdownTimer;
    }

    public isElapsed(): boolean {
        return this.countdownTimer <= 0;
    }

    public reset(): void {
        this._countdownTimer = this.delay;
    }

    public evaluate(): State {
        if (!this.hasChildren()) {
            return this.state = State.FAILURE;
        }
        this._countdownTimer -= GameTime.delta;

        if (this.isElapsed()) {
            this.state = this.children[0].evaluate();
            if (this.elapsedCallback) {
                this.elapsedCallback();
            }
            
            return this.state;
        } else {
            this.state = State.RUNNING;
        }

        return this.state;
    }
}
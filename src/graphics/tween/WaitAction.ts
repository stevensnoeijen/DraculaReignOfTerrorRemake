import { Entity } from 'ecsy';
import { ITweenAction } from './ITweenAction';

export interface IWaitActionProps {
    duration: number;
}

export class WaitAction implements ITweenAction {
    private readonly duration: number;
    private elapsedTime = 0;
    private _done = false;

    constructor(private readonly entity: Entity, props: IWaitActionProps) {
        this.duration = props.duration;
    }

    public update(delta: number): void {
        this.elapsedTime += delta;

        if (this.elapsedTime >= this.duration) {
            this._done = true;
        }
    }

    public get done(): boolean {
        return this._done;
    }
}
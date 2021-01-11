import { Entity } from 'ecsy';
import { ITweenAction } from './ITweenAction';

export class WaitAction implements ITweenAction {
    private readonly duration: number;
    private elapsedTime = 0;
    private _done = false;

    /**
     * 
     * @param {Entity} entity 
     * @param {number} duration - in ms
     */
    constructor(private readonly entity: Entity, duration: number) {
        this.duration = duration;
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
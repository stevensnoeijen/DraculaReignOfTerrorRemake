import { Entity } from 'ecsy';
import { PositionComponent } from '../../components/PositionComponent';
import { IPosition } from '../IPosition';
import { ITweenAction } from './ITweenAction';

export interface IMoveToActionProps {
    /**
     * if not set, position of entity will be used as start position
     */
    startPosition?: IPosition;
    destination: IPosition;
    duration?: number;
}

export class MoveToAction implements ITweenAction {

    private readonly startPosition: IPosition;
    private readonly destination: IPosition;
    /**
     * Time of the animation
     * Number is in miliseconds.
     * default: 0. Which is instant.
     */
    private readonly duration: number;
    private elapsedTime = 0;
    private _done = false;

    constructor(private readonly entity: Entity, props: IMoveToActionProps) {
        this.destination = props.destination;
        this.duration = props.duration || 0;

        if (props.startPosition) {
            this.startPosition = props.startPosition;
        } else {
            const position = this.entity.getComponent(PositionComponent);
            if (!position) {
                this.startPosition = {
                    x: 0,
                    y: 0,
                };
                this._done = true;
            } else {
                this.startPosition = {
                    x: position.x,
                    y: position.y,
                };
            }
        }
    }

    public update(delta: number): void {
        this.elapsedTime += delta;
        if (this.done) {
            return;
        }

        // calculate percentage done of the animation
        const percentage = this.duration > 0 ? this.elapsedTime / this.duration : 1;
        // set position to that percentage
        this.updatePosition(percentage);
    }

    public get done(): boolean {
        return this._done;
    }

    private updatePosition(percentage: number): void {
        const position = this.entity.getMutableComponent(PositionComponent);
        if (!position) {
            // entity has no position anymore, done
            this._done = true;
            return;
        }

        if (percentage >= 1) {
            // done, snap to end-position
            position.x = this.destination.x;
            position.y = this.destination.y;
            this._done = true;
        } else {
            // calculate position accoring to the percentage
            if (this.destination.x || this.destination.y) {
                this.updateAxis(position, 'x', percentage);
                this.updateAxis(position, 'y', percentage);
            }
        }
    }

    private updateAxis(
        position: PositionComponent,
        axis: 'x' | 'y',
        percentage: number
    ): void {
        const length = this.destination[axis] - this.startPosition[axis];
        position[axis] = this.startPosition[axis] + length * percentage;
    }
}
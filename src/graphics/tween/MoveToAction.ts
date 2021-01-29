import { Entity } from 'ecsy';
import { TransformComponent } from '../../components/TransformComponent';
import { RotationComponent } from '../../components/RotationComponent';
import { Vector2 } from '../../math/Vector2';
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
            const transform = this.entity.getComponent(TransformComponent);
            if (!transform) {
                this.startPosition = {
                    x: 0,
                    y: 0,
                };
                this._done = true;
            } else {
                this.startPosition = {
                    x: transform.position.x,
                    y: transform.position.y,
                };
            }
        }
    }

    public update(delta: number): void {
        const firstFrame = 0 === this.elapsedTime;
        this.elapsedTime += delta;
        if (this.done) {
            return;
        }
        if (firstFrame) {
            this.setRotation();
        }

        // calculate percentage done of the animation
        const percentage = this.duration > 0 ? this.elapsedTime / this.duration : 1;
        // set position to that percentage
        this.updatePosition(percentage);
    }

    public get done(): boolean {
        return this._done;
    }

    private setRotation(): void {
        const rotation = this.entity.getMutableComponent(RotationComponent);
        if (rotation) {
            rotation.rotation = Vector2.angle(new Vector2({ x: this.startPosition.x, y: this.startPosition.y }), new Vector2({ x: this.destination.x, y: this.destination.y })) - 90;
        }
    }

    private updatePosition(percentage: number): void {
        const transform = this.entity.getMutableComponent(TransformComponent);
        if (!transform) {
            // entity has no position anymore, done
            this._done = true;
            return;
        }

        if (percentage >= 1) {
            // done, snap to end-position
            transform.position.x = this.destination.x;
            transform.position.y = this.destination.y;
            this._done = true;
        } else {
            // calculate position accoring to the percentage
            if (this.destination.x || this.destination.y) {
                this.updateAxis(transform, 'x', percentage);
                this.updateAxis(transform, 'y', percentage);
            }
        }
    }

    private updateAxis(
        transform: TransformComponent,
        axis: 'x' | 'y',
        percentage: number
    ): void {
        const length = this.destination[axis] - this.startPosition[axis];
        transform.position[axis] = this.startPosition[axis] + length * percentage;
    }
}
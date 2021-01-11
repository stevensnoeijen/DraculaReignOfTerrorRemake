import { Entity } from 'ecsy';
import { PositionComponent } from '../../components/PositionComponent';

export interface MoveToProps {
    x?: number;

    y?: number;

    /**
     * Time of the animation
     * Number is in miliseconds.
     * default: 0. Which is instant.
     */
    speed?: number;

    // TODO: move to seperate
    waitAfter?: number;
}

export class MoveTo {

    private action: {
        startPosition: { x: number; y: number };
        options: MoveToProps;
    };
    private elapsedTime = 0;
    private _done = false;

    constructor(private readonly entity: Entity, props: MoveToProps) {
        const position = this.entity.getComponent(PositionComponent);
        if (!position) {
            return;
        }

        // do in next #update
        this.action = {
            startPosition: {
                x: position.x,
                y: position.y,
            },
            options: props,
        };
    }

    public update(delta: number): void {
        this.elapsedTime += delta;
        // calculate percentage done of the animation
        const percentage = this.action.options.speed
            ? this.elapsedTime / this.action.options.speed
            : 1;
        // set position to that percentage
        this.updatePosition(percentage);
    }

    public get done(): boolean {
        return this._done;
    }

    private updatePosition(percentage: number): void {
        if (percentage >= 1) {
            // done, snap to end-position
            const position = this.entity.getMutableComponent(PositionComponent)!;
            if (undefined !== this.action.options.x) {
                position.x = this.action.options.x;
            }
            if (undefined !== this.action.options.y) {
                position.y = this.action.options.y;
            }
            if (this.action.options.waitAfter) {
                if (this.elapsedTime >= this.action.options.waitAfter) {
                    this._done = true;
                }
            } else {
                this._done = true;
            }
        } else {
            // calculate position accoring to the percentage
            if (this.action.options.x || this.action.options.y) {
                const position = this.entity.getMutableComponent(PositionComponent)!;
                if (this.action.options.x) {
                    this.updateAxis(position, 'x', percentage);
                }
                if (this.action.options.y) {
                    this.updateAxis(position, 'y', percentage);
                }
            }
        }
    }

    private updateAxis(
        position: PositionComponent,
        axis: 'x' | 'y',
        percentage: number
    ): void {
        const length = this.action.options[axis]! - this.action.startPosition[axis];
        position[axis] = this.action.startPosition[axis]! + length * percentage;
    }
}
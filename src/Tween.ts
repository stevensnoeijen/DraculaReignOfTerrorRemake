import { Entity } from 'ecsy';
import { MovableComponent } from './components/MovableComponent';
import { PositionComponent } from './components/PositionComponent';
import { TweenComponent } from './components/TweenComponent';

type MoveToOptions = {
	x?: number;

	y?: number;

	/**
	 * Time of the animation
	 * Number is in miliseconds.
	 * default: 0. Which is instant.
	 */
	speed?: number;

	waitAfter?: number;
};

export class Tween {
	public static target(entity: Entity): Tween {
		return new Tween(entity);
	}

	private action: {
		startPosition: { x: number; y: number };
		options: MoveToOptions;
	};
	private duration = 0;
	private _after: (() => void) | null = null;

	constructor(private readonly entity: Entity) { }

	public moveTo(options: MoveToOptions): this {
		const position = this.entity.getComponent(PositionComponent)!;
		// do in next #update
		this.action = {
			startPosition: {
				x: position.x,
				y: position.y,
			},
			options: options,
		};

		if (this.entity.hasComponent(MovableComponent)) {
			this.entity.getMutableComponent(MovableComponent)!.moving = true;
		}
		this.entity.getMutableComponent(TweenComponent)!.tween = this;

		return this;
	}

	public after(fn: () => void): void {
		this._after = fn;
	}

	public update(delta: number): void {
		this.duration += delta;
		// calculate percentage done of the animation
		const percentage = this.action.options.speed
			? this.duration / this.action.options.speed
			: 1;
		// set position to that percentage
		this.updatePosition(percentage);
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
				if (this.duration >= this.action.options.waitAfter) {
					this.remove();
				}
			} else {
				this.remove();
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

	public remove(): void {
		if (this.entity.hasComponent(MovableComponent)) {
			this.entity.getMutableComponent(MovableComponent)!.moving = false;
			if (this._after) {
				this._after();
			}
		}
		this.entity.getMutableComponent(TweenComponent)!.tween = undefined;
	}
}

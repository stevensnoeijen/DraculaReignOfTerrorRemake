import { Entity } from 'ecsy';
import { MovableComponent } from '../../components/MovableComponent';
import { TweenComponent } from '../../components/TweenComponent';
import { ITweenAction } from './ITweenAction';
import { MoveToAction, IMoveToActionProps } from './MoveToAction';
import { IWaitActionProps, WaitAction } from './WaitAction';

export class Tween {
	public static target(entity: Entity): Tween {
		return new Tween(entity);
	}

	private actions: ITweenAction[] = [];
	private elapsedTime = 0;

	constructor(private readonly entity: Entity) { }

	public moveTo(props: IMoveToActionProps): this {
		this.actions.push(new MoveToAction(this.entity, props));

		return this;
	}

	public wait(props: IWaitActionProps): this {
		this.actions.push(new WaitAction(this.entity, props));
		return this;
	}

	public start(): void {
		const movable = this.entity.getMutableComponent(MovableComponent);
		if (movable) {
			movable.moving = true;
		}

		const tween = this.entity.getMutableComponent(TweenComponent);
		if (!tween) {
			throw new Error('entity requires TweenComponent to Tween!');
		}
		tween.tween = this;
	}

	public update(delta: number): void {
		this.elapsedTime += delta;

		const currentAction = this.actions[0];
		if (!currentAction) {
			this.remove();
			return;
		}

		currentAction.update(delta);
		if (currentAction.done) {
			this.actions.shift();// remove current action
		}
	}

	/**
	 * Cancel tween whereby next frame the tween will be removed from the entity
	 */
	public cancel(): void {
		this.actions = [];
	}

	private remove(): void {
		const movable = this.entity.getMutableComponent(MovableComponent);
		if (movable) {
			movable.moving = false;
		}

		const tween = this.entity.getMutableComponent(TweenComponent);
		if (!tween) {
			return;
		}
		tween.tween = null;
	}
}

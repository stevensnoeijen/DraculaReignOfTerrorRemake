import { Entity } from 'ecsy';
import { MovableComponent } from '../../components/MovableComponent';
import { TweenComponent } from '../../components/TweenComponent';
import { MoveTo, MoveToProps } from './MoveTo';

export class Tween {
	public static target(entity: Entity): Tween {
		return new Tween(entity);
	}

	private action: MoveTo | null = null;
	private elapsedTime = 0;

	constructor(private readonly entity: Entity) { }

	public moveTo(props: MoveToProps): this {
		this.action = new MoveTo(this.entity, props);

		return this;
	}

	public start(): void {
		if (this.entity.hasComponent(MovableComponent)) {
			this.entity.getMutableComponent(MovableComponent)!.moving = true;
		}
		this.entity.getMutableComponent(TweenComponent)!.tween = this;
	}

	public update(delta: number): void {
		this.elapsedTime += delta;
		this.action?.update(delta);
		if (this.action?.done) {
			this.remove();
		}
	}

	public remove(): void {
		if (this.entity.hasComponent(MovableComponent)) {
			this.entity.getMutableComponent(MovableComponent)!.moving = false;
		}
		this.entity.getMutableComponent(TweenComponent)!.tween = undefined;
	}
}

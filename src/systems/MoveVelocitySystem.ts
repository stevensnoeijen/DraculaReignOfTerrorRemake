import { Attributes, Entity, System, SystemQueries, World } from 'ecsy';
import Matter from 'matter-js';
import { AliveComponent } from '../components/AliveComponent';
import { MoveVelocityComponent } from '../components/MoveVelocityComponent';
import { SizeComponent } from '../components/SizeComponent';
import { SpriteComponent } from '../components/SpriteComponent';
import { TransformComponent } from '../components/TransformComponent';
import { Constants } from '../Constants';
import { EntityHelper } from '../helpers/EntityHelper';
import { Bounds } from '../math/collision/Bounds';
import { Vector2 } from '../math/Vector2';

export class MoveVelocitySystem extends System {
	public static queries: SystemQueries = {
		bodies: {
			components: [MoveVelocityComponent, TransformComponent],
			listen: {
				added: true,
			}
		},
		alive: {
			components: [AliveComponent],
			listen: {
				changed: true,
			}
		}
	};

	private readonly engine: Matter.Engine;

	constructor(world: World, attributes: Attributes) {
		super(world, attributes);

		this.engine = Matter.Engine.create();
		this.engine.world.gravity.y = 0;
		// add walls to the map
		// top
		Matter.World.add(this.engine.world, Matter.Bodies.rectangle(Constants.GAME_WIDTH / 2, -1, Constants.GAME_WIDTH, 1, {
			isStatic: true,
		}));
		// left
		Matter.World.add(this.engine.world, Matter.Bodies.rectangle(0, Constants.GAME_HEIGHT / 2, 1, Constants.GAME_HEIGHT, {
			isStatic: true,
		}));
		// right
		Matter.World.add(this.engine.world, Matter.Bodies.rectangle(Constants.GAME_WIDTH, Constants.GAME_HEIGHT / 2, 1, Constants.GAME_HEIGHT, {
			isStatic: true,
		}));
		// bottom
		Matter.World.add(this.engine.world, Matter.Bodies.rectangle(Constants.GAME_WIDTH / 2, Constants.GAME_HEIGHT, Constants.GAME_WIDTH, 1, {
			isStatic: true,
		}))
	}

	public execute(delta: number, time: number): void {
		if (this.queries.bodies.added && this.queries.bodies.added.length > 0) {
			this.queries.bodies.added.forEach((entity) => this.handleEntityBodyAdded(entity));
		}
		if (this.queries.alive.changed && this.queries.alive.changed.length > 0) {
			this.queries.alive.changed.forEach((entity) => this.handledEntityAliveChanged(entity));
		}

		Matter.Engine.update(this.engine, delta);
		this.queries.bodies.results.forEach((entity) => this.updateEntityBody(entity, delta));
	}

	private handledEntityAliveChanged(entity: Entity): void {
		if (EntityHelper.isAlive(entity)) {
			return;
		}
		// if dead

		const moveVelocityComponent = entity.getMutableComponent(MoveVelocityComponent);
		if (null == moveVelocityComponent?.body) {
			return;
		}

		Matter.World.remove(this.engine.world, moveVelocityComponent.body);
	}

	private updateEntityBody(entity: Entity, delta: number): void {
		const moveVelocityComponent = entity.getMutableComponent(MoveVelocityComponent);
		if (null == moveVelocityComponent?.body || null == moveVelocityComponent?.velocity) {
			return;
		}

		const transformComponent = entity.getMutableComponent(TransformComponent);
		if (!transformComponent) {
			return;
		}
		Matter.Body.setVelocity(moveVelocityComponent.body, Matter.Vector.mult(Matter.Vector.create(moveVelocityComponent.velocity.x, moveVelocityComponent.velocity.y), moveVelocityComponent.moveSpeed * (delta / 1000)));

		transformComponent.position = new Vector2(moveVelocityComponent.body.position.x, moveVelocityComponent.body.position.y);

		const spriteComponent = entity.getComponent(SpriteComponent);
		if (spriteComponent != null){
			spriteComponent.sprite.position.set(moveVelocityComponent.body.position.x, moveVelocityComponent.body.position.y);
		}
	}

	private handleEntityBodyAdded(entity: Entity): void {
		// if (!EntityHelper.isAlive(entity)) {
		// 	return;// dont add a dead entity
		// }

		const transformComponent = entity.getComponent(TransformComponent);
		if (!transformComponent) {
			return;
		}
		const sizeComponent = entity.getComponent(SizeComponent);
		if (!sizeComponent) {
			return;
		}
		const moveVelocityComponent = entity.getMutableComponent(MoveVelocityComponent);
		if (!moveVelocityComponent) {
			return;
		}

		const bounds = new Bounds(transformComponent.position, new Vector2(sizeComponent.width, sizeComponent.height));

		const body = Matter.Bodies.rectangle(transformComponent.position.x - bounds.extends.x, transformComponent.position.y - bounds.extends.y, sizeComponent.width, sizeComponent.height);
		Matter.World.add(this.engine.world, body);
		moveVelocityComponent.body = body;
	}
}

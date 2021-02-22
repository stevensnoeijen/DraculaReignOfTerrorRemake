import { System, SystemQueries, World } from 'ecsy';
import Matter from 'matter-js';
import { Attributes } from 'react';
import { MoveVelocityComponent } from '../components/MoveVelocityComponent';
import { SizeComponent } from '../components/SizeComponent';
import { TransformComponent } from '../components/TransformComponent';
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
	};

	private readonly engine: Matter.Engine;

	constructor(world: World, attributes: Attributes) {
		super(world, attributes);

		this.engine = Matter.Engine.create();
		this.engine.world.gravity.y = 0;
	}


	public execute(delta: number, time: number): void {
		if (this.queries.bodies.added && this.queries.bodies.added.length > 0) {
			for (const entity of this.queries.bodies.added) {
				const transformComponent = entity.getComponent(TransformComponent);
				if (!transformComponent) {
					continue;
				}
				const sizeComponent = entity.getComponent(SizeComponent);
				if (!sizeComponent) {
					continue;
				}
				const moveVelocityComponent = entity.getMutableComponent(MoveVelocityComponent);
				if (!moveVelocityComponent) {
					continue;
				}

				const bounds = new Bounds(transformComponent.position, new Vector2({
					x: sizeComponent.width,
					y: sizeComponent.height
				}));

				const body = Matter.Bodies.rectangle(transformComponent.position.x - bounds.extends.x, transformComponent.position.y - bounds.extends.y, sizeComponent.width, sizeComponent.height);
				Matter.World.add(this.engine.world, body);
				moveVelocityComponent.body = body;
			}
		}

		Matter.Engine.update(this.engine, delta);
		for (const entity of this.queries.bodies.results) {
			const moveVelocityComponent = entity.getMutableComponent(MoveVelocityComponent);
			if (!moveVelocityComponent || null === moveVelocityComponent.body) {
				continue;
			}

			const transformComponent = entity.getMutableComponent(TransformComponent);
			if (!transformComponent) {
				continue;
			}
			Matter.Body.setVelocity(moveVelocityComponent.body, Matter.Vector.mult(Matter.Vector.create(moveVelocityComponent.velocity.x, moveVelocityComponent.velocity.y), moveVelocityComponent.moveSpeed * (delta / 1000)));

			transformComponent.position = new Vector2({
				x: moveVelocityComponent.body.position.x,
				y: moveVelocityComponent.body.position.y,
			});
		}
	}
}

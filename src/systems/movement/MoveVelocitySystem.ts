import { Attributes, Entity, System, SystemQueries, World } from 'ecsy';

import { AliveComponent } from '../alive/AliveComponent';
import { MoveVelocityComponent } from './MoveVelocityComponent';
import { SpriteComponent } from '../render/sprite/SpriteComponent';
import { TransformComponent } from '../TransformComponent';

export class MoveVelocitySystem extends System {
	public static queries: SystemQueries = {
		bodies: {
			components: [MoveVelocityComponent, TransformComponent],
			listen: {
				added: true,
			}
		},
	};

	public execute(delta: number, time: number): void {
		this.queries.bodies.results.forEach((entity) => this.updateEntityBody(entity, delta));
	}

	private updateEntityBody(entity: Entity, delta: number): void {
		const moveVelocityComponent = entity.getMutableComponent(MoveVelocityComponent);
		if (moveVelocityComponent?.velocity == null) {
			return;
		}

		const transformComponent = entity.getMutableComponent(TransformComponent);
		if (!transformComponent) {
			return;
		}

		transformComponent.position.x = transformComponent.position.x + moveVelocityComponent.velocity.x;
		transformComponent.position.y = transformComponent.position.y + moveVelocityComponent.velocity.y;
	}
}

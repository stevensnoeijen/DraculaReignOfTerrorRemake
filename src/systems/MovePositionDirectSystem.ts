import { System } from 'ecsy';
import { MovePositionDirectComponent } from '../components/MovePositionDirectComponent';
import { MoveTransformVelocityComponent } from '../components/MoveTransformVelocityComponent';
import { MoveVelocityComponent } from '../components/MoveVelocityComponent';
import { TransformComponent } from '../components/TransformComponent';
import { Vector2 } from '../math/Vector2';

export class MovePositionDirectSystem extends System {
	public static queries = {
		entities: {
			components: [MovePositionDirectComponent],
		},
	};

	public execute(delta: number, time: number): void {
		for (const entity of this.queries.entities.results) {
			const movePositionDirectComponent = entity.getMutableComponent(MovePositionDirectComponent);
			if (null == movePositionDirectComponent?.movePosition) {
				continue;
			}
			const transformComponent = entity.getMutableComponent(TransformComponent);
			if (!transformComponent) {
				continue;
			}
			const moveTransformVelocityComponent = entity.getMutableComponent(MoveTransformVelocityComponent);
			if (moveTransformVelocityComponent) {
				if (Vector2.distance(transformComponent.position, movePositionDirectComponent.movePosition) < 5) {
					// stop
					movePositionDirectComponent.movePosition = null;
					moveTransformVelocityComponent.velocity = Vector2.ZERO;
					continue;
				}

				moveTransformVelocityComponent.velocity = Vector2.subtracts(movePositionDirectComponent.movePosition, transformComponent.position).normalized();
			}
			const moveVelocityComponent = entity.getMutableComponent(MoveVelocityComponent);
			if (moveVelocityComponent) {
				if (Vector2.distance(transformComponent.position, movePositionDirectComponent.movePosition) < 5) {
					// stop
					movePositionDirectComponent.movePosition = null;
					moveVelocityComponent.velocity = Vector2.ZERO;
					continue;
				}
				moveVelocityComponent.velocity = Vector2.subtracts(movePositionDirectComponent.movePosition, transformComponent.position).normalized();
			}


			transformComponent.rotation = Vector2.angle(transformComponent.position, movePositionDirectComponent.movePosition) - 90;
		}
	}
}

import { System, SystemQueries } from 'ecsy';
import { MoveTransformVelocityComponent } from './MoveTransformVelocityComponent';
import { TransformComponent } from '../TransformComponent';
import { Vector2 } from '../../math/Vector2';

export class MoveTransformVelocitySystem extends System {
	public static queries: SystemQueries = {
		movables: {
			components: [MoveTransformVelocityComponent, TransformComponent],
		},
	};

	public execute(delta: number, time: number): void {
		for (const entity of this.queries.movables.results) {
			const moveTransformVelocityComponent = entity.getComponent(MoveTransformVelocityComponent);
			if (!moveTransformVelocityComponent) {
				continue;
			}
			const transformComponent = entity.getMutableComponent(TransformComponent);
			if (!transformComponent) {
				continue;
			}

			if (!moveTransformVelocityComponent.velocity.equals(Vector2.ZERO)) {
				console.log('moving');
				transformComponent.position = Vector2.adds(transformComponent.position, moveTransformVelocityComponent.calculateMovement(delta));
			}
		}
	}
}
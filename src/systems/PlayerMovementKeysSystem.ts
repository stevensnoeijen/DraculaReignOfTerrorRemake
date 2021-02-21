import { System } from 'ecsy';
import { MoveTransformVelocityComponent } from '../components/MoveTransformVelocityComponent';
import { PlayerMovementKeysComponent } from '../components/PlayerMovementKeysComponent';
import { SelectableComponent } from '../components/SelectableComponent';
import { TransformComponent } from '../components/TransformComponent';
import { Input } from '../input/Input';
import { Vector2 } from '../math/Vector2';

export class PlayerMovementKeysSystem extends System {
	public static queries = {
		entities: {
			components: [PlayerMovementKeysComponent, SelectableComponent],
		},
	};

	public execute(delta: number, time: number): void {
		for (const entity of this.queries.entities.results) {
			const selectableComponent = entity.getComponent(SelectableComponent);
			if (!selectableComponent || !selectableComponent.selected) {
				continue;
			}

			let moveX = 0;
			let moveY = 0;

			if (Input.isKeyDown('w')) {
				moveY -= 1;
			}
			if (Input.isKeyDown('s')) {
				moveY += 1;
			}
			if (Input.isKeyDown('a')) {
				moveX -= 1;
			}
			if (Input.isKeyDown('d')) {
				moveX += 1;
			}

			const moveVector = new Vector2({
				x: moveX,
				y: moveY,
			}).normalized();

			const moveTransformVelocityComponent = entity.getMutableComponent(MoveTransformVelocityComponent);
			if (!moveTransformVelocityComponent) {
				continue;
			}

			moveTransformVelocityComponent.velocity = moveVector;

			const transformComponent = entity.getMutableComponent(TransformComponent);
			if (!transformComponent) {
				continue;
			}

			if (!moveVector.equals(Vector2.ZERO)) {
				transformComponent.rotation = Vector2.angle(Vector2.ZERO, moveVector) - 90;
			}
		}
	}
}

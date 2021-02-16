import { System } from 'ecsy';
import { MoveTransformVelocityComponent } from '../components/MoveTransformVelocityComponent';
import { PlayerMovementKeysComponent } from '../components/PlayerMovementKeysComponent';
import { Input } from '../input/Input';
import { Vector2 } from '../math/Vector2';

export class PlayerMovementKeysSystem extends System {
	public static queries = {
		entities: {
			components: [PlayerMovementKeysComponent],
		},
	};

	public execute(delta: number, time: number): void {
		for (const entity of this.queries.entities.results) {
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
		}
	}
}

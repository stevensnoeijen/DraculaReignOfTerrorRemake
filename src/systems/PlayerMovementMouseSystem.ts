import { System } from 'ecsy';
import { MovePositionDirectComponent } from '../components/MovePositionDirectComponent';
import { PlayerMovementMouseComponent } from '../components/PlayerMovementMouseComponent';
import { Input } from '../input/Input';

export class PlayerMovementMouseSystem extends System {
	public static queries = {
		entities: {
			components: [PlayerMovementMouseComponent],
		},
	};

	public execute(delta: number, time: number): void {
		for (const entity of this.queries.entities.results) {
			if (Input.isMouseButtonDown(2)) {
				const movePositionDirectComponent = entity.getMutableComponent(MovePositionDirectComponent);
				if (!movePositionDirectComponent) {
					continue;
				}
				movePositionDirectComponent.movePosition = Input.mousePosition;
			}
		}
	}
}

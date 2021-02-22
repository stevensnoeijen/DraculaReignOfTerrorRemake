import { System } from 'ecsy';
import { MovePositionDirectComponent } from '../components/MovePositionDirectComponent';
import { PlayerMovementMouseComponent } from '../components/PlayerMovementMouseComponent';
import { SelectableComponent } from '../components/SelectableComponent';
import { Input } from '../input/Input';

export class PlayerMovementMouseSystem extends System {
	public static queries = {
		entities: {
			components: [PlayerMovementMouseComponent],
		},
	};

	public execute(delta: number, time: number): void {
		if (Input.isMouseButtonUp(2) || Input.isMouseDblClick()) {
			for (const entity of this.queries.entities.results) {
				const selectableComponent = entity.getComponent(SelectableComponent);
				if (!selectableComponent || !selectableComponent.selected) {
					continue;
				}

				const movePositionDirectComponent = entity.getMutableComponent(MovePositionDirectComponent);
				if (!movePositionDirectComponent) {
					continue;
				}
				movePositionDirectComponent.movePosition = Input.mousePosition;
			}
		}
	}
}

import { toGridPosition } from './utils';

import { Input } from '../../Input';
import { PlayerMovementMouseComponent } from './PlayerMovementMouseComponent';
import { SelectableComponent } from '../selection/SelectableComponent';
import { MovePositionDirectComponent } from '../movement/MovePositionDirectComponent';
import { TransformComponent } from '../TransformComponent';
import { PixiJsSystem } from '../PixiJsSystem';

export class PlayerMovementMouseSystem extends PixiJsSystem {
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

				const movePositionDirectComponent = entity.getMutableComponent(
					MovePositionDirectComponent
				);
				if (!movePositionDirectComponent) {
					continue;
				}

				const transformComponent = entity.getComponent(TransformComponent);
				if (!transformComponent) {
					continue;
				}

				movePositionDirectComponent.movePosition = toGridPosition(Input.mousePosition);
			}
		}
	}
}

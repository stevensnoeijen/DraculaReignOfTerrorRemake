import { System } from 'ecsy';

import { Input } from '../../Input';
import { PlayerMovementMouseComponent } from './PlayerMovementMouseComponent';
import { PathfindingComponent } from '../PathfindingComponent';
import { SelectableComponent } from '../selection/SelectableComponent';
import { MovePositionDirectComponent } from '../movement/MovePositionDirectComponent';
import { TransformComponent } from '../TransformComponent';

export class PlayerMovementMouseSystem extends System {
	public static queries = {
		entities: {
			components: [PlayerMovementMouseComponent],
		},
		pathfinding: {
			components: [PathfindingComponent],
		},
	};

	public execute(delta: number, time: number): void {
		if (Input.isMouseButtonUp(2) || Input.isMouseDblClick()) {
			const pathfinding = this.queries.pathfinding.results[0].getComponent(
				PathfindingComponent
			)!.pathfinding;

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

				const start = pathfinding.grid.getPosition(transformComponent.position);
				const end = pathfinding.grid.getPosition(Input.mousePosition);

				const path = pathfinding.findPath(start.x, start.y, end.x, end.y);
				console.log(path);

				movePositionDirectComponent.movePosition = Input.mousePosition;
			}
		}
	}
}

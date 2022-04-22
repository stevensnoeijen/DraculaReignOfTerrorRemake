import { convertPathfindingPathToPositions } from './../../utils';
import { MovePathComponent } from './../movement/MovePathComponent';
import { astar } from './../../ai/Pathfinding';
import { Input } from '../../Input';
import { PlayerMovementMouseComponent } from './PlayerMovementMouseComponent';
import { SelectableComponent } from '../selection/SelectableComponent';
import { TransformComponent } from '../TransformComponent';
import { PixiJsSystem } from '../PixiJsSystem';
import { getMouseGridPosition, toCenterGridPosition } from '../../utils';

export class PlayerMovementMouseSystem extends PixiJsSystem {
	public static queries = {
		entities: {
			components: [PlayerMovementMouseComponent],
		},
	};

	private map: number[][]|null = null;

	public setMap(map: number[][]): void {
		this.map = map;
	}

	public execute(delta: number, time: number): void {
		if (Input.isMouseButtonUp(2) || Input.isMouseDblClick()) {
			for (const entity of this.queries.entities.results) {
				const selectableComponent = entity.getComponent(SelectableComponent);
				if (!selectableComponent || !selectableComponent.selected) {
					continue;
				}

				const transformComponent = entity.getComponent(TransformComponent);
				if (!transformComponent) {
					continue;
				}

				if(this.map != null) {
					const path = astar(this.map, transformComponent.gridPosition, getMouseGridPosition());
					
					const movePathComponent = entity.getMutableComponent(MovePathComponent)!;
					movePathComponent.path = convertPathfindingPathToPositions(path.slice(1));
				}
			}
		}
	}
}
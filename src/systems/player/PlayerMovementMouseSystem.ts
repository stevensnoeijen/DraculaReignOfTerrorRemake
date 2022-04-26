import { DefaultAttributes } from './../DefaultAttributes';
import { Attributes, World } from 'ecsy';

import { convertPathfindingPathToPositions } from './../../utils';
import { MovePathComponent } from './../movement/MovePathComponent';
import { astar } from '../../ai/pathfinding';
import { Input } from '../../Input';
import { PlayerMovementMouseComponent } from './PlayerMovementMouseComponent';
import { SelectableComponent } from '../selection/SelectableComponent';
import { TransformComponent } from '../TransformComponent';
import { PixiJsSystem } from '../PixiJsSystem';
import { getMouseGridPosition } from '../../utils';
import { EventBus } from '../../EventBus';
import { Events, LevelLoadedEvent } from '../../Events';

export class PlayerMovementMouseSystem extends PixiJsSystem {
	public static queries = {
		entities: {
			components: [PlayerMovementMouseComponent],
		},
	};

	private map: number[][]|null = null;

	constructor(world: World, attributes: DefaultAttributes) {
        super(world, attributes);

        attributes.eventBus.on<LevelLoadedEvent>('level:loaded', (event) => {
            this.map = event.detail.level.collisionMap;
        });
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
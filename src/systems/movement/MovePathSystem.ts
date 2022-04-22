import { MovePathComponent } from './MovePathComponent';
import { System } from "ecsy";
import { MovePositionDirectComponent } from './MovePositionDirectComponent';
import { Vector2 } from '../../math/Vector2';
import { cellPositionToVector } from '../../utils';

export class MovePathSystem extends System {
    public static queries = {
		entities: {
			components: [MovePathComponent],
		},
	};

    public execute(delta: number, time: number): void {
        for(const entity of this.queries.entities.results) {            
            const movePathComponent = entity.getMutableComponent(MovePathComponent)!;

            if(movePathComponent.path.length == 0) {
                continue;
            }

            const movePositionDirectComponent = entity.getMutableComponent(MovePositionDirectComponent)!;
            if (movePositionDirectComponent.movePosition != null) {
                // is currently moving
                continue;
            }

            const cell = movePathComponent.path.shift();
            if (cell == null) {
                continue;
            }
            movePositionDirectComponent.movePosition = cellPositionToVector(cell.x, cell.y);
        }
    }
}


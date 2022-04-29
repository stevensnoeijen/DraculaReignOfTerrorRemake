import { Entity, System } from "ecsy";

import { getCell, Position } from './../../utils';
import { CollidableComponent } from './CollidableComponent';
import { MovePathComponent } from './MovePathComponent';
import { MovePositionDirectComponent } from './MovePositionDirectComponent';
import { cellPositionToVector } from '../../utils';
import { isNotEntity } from "../utils";

export class MovePathSystem extends System {
    public static queries = {
		entities: {
			components: [MovePathComponent],
		},
        colliders: {
            components: [CollidableComponent],
        }
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

            const nextCell = movePathComponent.path[0];
            if (nextCell == null) {
                continue;
            }
            if (!this.canEntityMoveToCell(entity, nextCell)) {
                // cancel move
                continue;
            }
            movePathComponent.path.shift();

            movePositionDirectComponent.movePosition = cellPositionToVector(nextCell.x, nextCell.y);
        }
    }

    private canEntityMoveToCell(entity: Entity, cell: Position): boolean {
        const colliders = this.queries.colliders.results.filter(isNotEntity(entity));

        const collider = colliders.find((collider) => {
            const colliderCell = getCell(collider);

            return cell.x === colliderCell.x && cell.y === colliderCell.y;
        });

        return collider == null;
    }
}
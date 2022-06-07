import { TransformComponent } from './../TransformComponent';
import { Entity, System } from "ecsy";

import { getCell, not, Position } from './../../utils';
import { CollidableComponent } from './CollidableComponent';
import { MovePathComponent } from './MovePathComponent';
import { MovePositionDirectComponent } from './MovePositionDirectComponent';
import { cellPositionToVector } from '../../utils';
import { ControlledComponent } from './../ControlledComponent';
import { isSameEntity } from './../utils/index';
import { AssetComponent } from './../render/AssetComponent';
import { rotationToDirection, State } from './../../animations';
import { AnimatedSpriteComponent } from './../render/sprite/AnimatedSpriteComponent';

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

            if (!this.canEntityMoveToCell(entity, nextCell)) {
                // cancel move
                continue;
            }
            movePathComponent.path.shift();

            movePositionDirectComponent.movePosition = cellPositionToVector(nextCell.x, nextCell.y);
            this.setEntityState(entity, 'move');

            if (movePathComponent.path.length === 0) {
                if (entity.hasComponent(ControlledComponent)) {
                    entity.getMutableComponent(ControlledComponent)!.by = null;
                }
                this.setEntityState(entity, 'idle');
            }
        }
    }

    private setEntityState (entity: Entity, state: State): void {
        const spriteComponent = entity.getComponent(AnimatedSpriteComponent);
        if (spriteComponent != null) {
            const assetComponent = entity.getComponent(AssetComponent);
            if (assetComponent == null) {
                return;
            }
            const transformComponent = entity.getMutableComponent(TransformComponent);
            const direction = rotationToDirection(transformComponent?.rotation ?? 0)!;

            if (spriteComponent.sprite.textures !== assetComponent.animations[state][direction]) {
                spriteComponent.sprite.textures = assetComponent.animations[state][direction];
                spriteComponent.sprite.play();
            }            
        }
    }

    private canEntityMoveToCell(entity: Entity, cell: Position): boolean {
        const colliders = this.queries.colliders.results.filter(not(isSameEntity(entity)));

        const collider = colliders.find((collider) => {
            const colliderCell = getCell(collider);

            return cell.x === colliderCell.x && cell.y === colliderCell.y;
        });

        return collider == null;
    }
}
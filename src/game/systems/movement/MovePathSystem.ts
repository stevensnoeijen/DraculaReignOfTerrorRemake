import { setEntityAnimation } from './../render/sprite/utils';
import { MoveVelocityComponent } from './MoveVelocityComponent';
import { TransformComponent } from './../TransformComponent';
import { Entity, System } from 'ecsy';

import { getCell, not, Position } from './../../utils';
import { CollidableComponent } from './CollidableComponent';
import { MovePathComponent } from './MovePathComponent';
import { MovePositionDirectComponent } from './MovePositionDirectComponent';
import { cellPositionToVector } from '../../utils';
import { ControlledComponent } from './../ControlledComponent';
import { isSameEntity } from './../utils/index';
import { AssetComponent } from './../render/AssetComponent';
import { rotationToDirection, State } from '../../animation/utils';
import { AnimatedSpriteComponent } from './../render/sprite/AnimatedSpriteComponent';
import { Vector2 } from '../../math/Vector2';

export class MovePathSystem extends System {
  public static queries = {
    entities: {
      components: [MovePathComponent],
    },
    colliders: {
      components: [CollidableComponent],
    },
  };

  public execute(delta: number, time: number): void {
    for (const entity of this.queries.entities.results) {
      const movePathComponent = entity.getMutableComponent(MovePathComponent)!;

      if (movePathComponent.path.length == 0) {
        const moveVelocityComponent = entity.getComponent(
          MoveVelocityComponent
        );
        if (
          moveVelocityComponent?.velocity != null &&
          Vector2.ZERO.equals(moveVelocityComponent.velocity)
        ) {
          if (entity.hasComponent(ControlledComponent)) {
            entity.getMutableComponent(ControlledComponent)!.by = null;
          }
          if (
            !entity
              .getComponent(AnimatedSpriteComponent)
              ?.state.startsWith('attack')
          ) {
            setEntityAnimation(entity, 'idle');
          }
        }

        continue;
      }

      const movePositionDirectComponent = entity.getMutableComponent(
        MovePositionDirectComponent
      )!;
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

      movePositionDirectComponent.movePosition = cellPositionToVector(
        nextCell.x,
        nextCell.y
      );
      const transformComponent =
        entity.getMutableComponent(TransformComponent)!;
      if (
        !transformComponent.position.equals(
          movePositionDirectComponent.movePosition
        )
      ) {
        transformComponent.rotation = Vector2.angle(
          transformComponent.position,
          movePositionDirectComponent.movePosition
        );
      }

      setEntityAnimation(entity, 'move');
    }
  }

  private canEntityMoveToCell(entity: Entity, cell: Position): boolean {
    const colliders = this.queries.colliders.results.filter(
      not(isSameEntity(entity))
    );

    const collider = colliders.find((collider) => {
      const colliderCell = getCell(collider);

      return cell.x === colliderCell.x && cell.y === colliderCell.y;
    });

    return collider == null;
  }
}

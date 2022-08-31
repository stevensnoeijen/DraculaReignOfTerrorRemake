import { Entity, System } from 'ecsy';

import { cellPositionToVector } from '../../utils';
import { Vector2 } from '../../math/Vector2';
import { setEntityAnimation } from '../utils/animation';
import { Transform } from '../../components/Transform';

import { MoveVelocityComponent } from './MoveVelocityComponent';
import { getCell, not, Position } from './../../utils';
import { CollidableComponent } from './CollidableComponent';
import { MovePathComponent } from './MovePathComponent';
import { MovePositionDirectComponent } from './MovePositionDirectComponent';
import { ControlledComponent } from './../ControlledComponent';
import { getSimComponent, isSameEntity } from './../utils/index';

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
      const transformComponent = getSimComponent(entity, Transform);
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

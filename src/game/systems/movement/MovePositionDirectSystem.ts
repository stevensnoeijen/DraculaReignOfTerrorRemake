import { Entity, System } from 'ecsy';

import { Transform } from '../../components/Transform';
import { Vector2 } from '../../math/Vector2';
import { MoveVelocity } from '../../components/movement/MoveVelocity';

import { getSimComponent } from './../utils/index';
import { MovePositionDirectComponent } from './MovePositionDirectComponent';
import { MoveTransformVelocityComponent } from './MoveTransformVelocityComponent';


export class MovePositionDirectSystem extends System {
  public static queries = {
    entities: {
      components: [MovePositionDirectComponent],
    },
  };

  public execute(delta: number, time: number): void {
    for (const entity of this.queries.entities.results) {
      const movePositionDirectComponent = entity.getMutableComponent(
        MovePositionDirectComponent
      );
      if (null == movePositionDirectComponent?.movePosition) {
        continue;
      }
      const transformComponent = getSimComponent(entity, Transform);
      if (!transformComponent) {
        continue;
      }

      // TODO: remove this?
      // this.moveByTransformVelocity(entity, transformComponent, movePositionDirectComponent);
      this.moveByMoveVelocity(
        entity,
        transformComponent,
        movePositionDirectComponent
      );
    }
  }

  private moveByTransformVelocity(
    entity: Entity,
    transformComponent: Transform,
    movePositionDirectComponent: MovePositionDirectComponent
  ): void {
    const moveTransformVelocityComponent = entity.getMutableComponent(
      MoveTransformVelocityComponent
    );
    if (moveTransformVelocityComponent) {
      if (
        Vector2.distance(
          transformComponent.position,
          movePositionDirectComponent.movePosition!
        ) < 1
      ) {
        transformComponent.position = movePositionDirectComponent.movePosition!;
        // stop
        movePositionDirectComponent.movePosition = null;
        moveTransformVelocityComponent.velocity = Vector2.ZERO;
        return;
      }

      moveTransformVelocityComponent.velocity = Vector2.subtracts(
        movePositionDirectComponent.movePosition!,
        transformComponent.position
      ).normalized();
    }
  }

  private moveByMoveVelocity(
    entity: Entity,
    transformComponent: Transform,
    movePositionDirectComponent: MovePositionDirectComponent
  ): void {
    const moveVelocityComponent = getSimComponent(entity, MoveVelocity);
    if (moveVelocityComponent) {
      if (
        Vector2.distance(
          transformComponent.position,
          movePositionDirectComponent.movePosition!
        ) < 1
      ) {
        transformComponent.position = movePositionDirectComponent.movePosition!;
        // stop
        movePositionDirectComponent.movePosition = null;
        moveVelocityComponent.velocity = Vector2.ZERO;
        return;
      }

      moveVelocityComponent.velocity = Vector2.subtracts(
        movePositionDirectComponent.movePosition!,
        transformComponent.position
      ).normalized();
    }
  }
}

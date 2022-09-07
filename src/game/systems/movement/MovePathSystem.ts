import { createSystem, IEntity, queryComponents, Read, ReadEntity, Write, ReadOptional, WriteEvents } from 'sim-ecs';
import { IEventWriter } from 'sim-ecs/dist/events';

import { Vector2 } from '../../math/Vector2';
import { Transform } from '../../components/Transform';
import { MovePositionDirect } from '../../components/movement/MovePositionDirect';
import { Controlled } from '../../components/input/Controlled';
import { Moved } from '../../events/Moved';
import { MoveVelocity } from '../../components/movement/MoveVelocity';

import { Position } from '~/game/utils/types';
import { MovePath } from '~/game/components/movement/MovePath';
import { isSameEntity } from '~/game/utils/entity';
import { cellPositionToVector } from '~/game/utils/grid';
import { not } from '~/utils/predicate';
import { getCell, isAlive } from '~/game/utils/components';

const canEntityMoveToCell = (
  colliders: IEntity[],
  entity: IEntity,
  cell: Position
): boolean => {
  const collider = colliders.filter(not(isSameEntity(entity)))
    .filter(isAlive)
    .find((collider) => {
      const colliderCell = getCell(collider);

      return cell.x === colliderCell.x && cell.y === colliderCell.y;
    });

  return collider == null;
};

const updateMovePosition = (
  entities: IEntity[],
  entity: IEntity,
  movePath: MovePath,
  moveVelocity: MoveVelocity,
  movePositionDirect: MovePositionDirect,
  controlled: Controlled | null,
  moved: IEventWriter<typeof Moved>,
) => {
  if (movePath.path.length == 0) {
    if (
      moveVelocity?.velocity != null &&
      Vector2.ZERO.equals(moveVelocity.velocity)
    ) {
      if (controlled != null)
      controlled.by = null;
    }

    return;
  }

  if (movePositionDirect.movePosition != null) {
    // is currently moving
    return;
  }

  const nextCell = movePath.path[0];

  if (
    !canEntityMoveToCell(
      entities,
      entity,
      nextCell
    )
  ) {
    // cancel move
    return;
  }
  movePath.path.shift();

  movePositionDirect.movePosition = cellPositionToVector(
    nextCell.x,
    nextCell.y
  );
  const transformComponent = entity.getComponent(Transform)!;
  if (
    !transformComponent.position.equals(
      movePositionDirect.movePosition
    )
  ) {
    transformComponent.rotation = Vector2.angle(
      transformComponent.position,
      movePositionDirect.movePosition
    );
  }

  if (!transformComponent.position.equals(Vector2.ZERO))
    moved.publish(new Moved(entity));
};

export const MovePathSystem = createSystem({
  moved: WriteEvents(Moved),

  query: queryComponents({
    entity: ReadEntity(),
    movePath: Write(MovePath),
    moveVelocity: Read(MoveVelocity),
    movePositionDirect: Write(MovePositionDirect),
    controlled: ReadOptional(Controlled),
  }),
})
.withRunFunction(({
  moved,
  query,
}) => {
  query.execute(({ movePath, moveVelocity, entity, movePositionDirect, controlled }) => {
    updateMovePosition(
      Array.from(query.iter()).map(e => e.entity),
      entity,
      movePath,
      moveVelocity,
      movePositionDirect,
      controlled ?? null,
      moved,
    );
  });
})
.build();

import { createSystem, IEntity, queryComponents, Read, ReadEntity, Write } from 'sim-ecs';
import { Entity } from 'ecsy';

import { cellPositionToVector } from '../../utils';
import { Vector2 } from '../../math/Vector2';
import { setEntityAnimation } from '../utils/animation';
import { Transform } from '../../components/Transform';
import { MovePositionDirect } from '../../components/movement/MovePositionDirect';

import { EcsyEntity } from './../../components/EcsyEntity';
import { MoveVelocity } from './../../components/movement/MoveVelocity';
import { getCell, not, Position } from './../../utils';
import { ControlledComponent } from './../ControlledComponent';
import { getSimComponent, isSameEntity } from './../utils/index';

import { MovePath } from '~/game/components/movement/MovePath';

const canEntityMoveToCell = (
  colliders: Entity[],
  entity: Entity,
  cell: Position
): boolean => {
  const collider = colliders.filter(
      not(isSameEntity(entity))
    ).find((collider) => {
      const colliderCell = getCell(collider);

      return cell.x === colliderCell.x && cell.y === colliderCell.y;
    });

  return collider == null;
};

const updateMovePosition = (
  entities: IEntity[],
  entity: Entity,
  movePath: MovePath,
  moveVelocity: MoveVelocity,
  movePositionDirect: MovePositionDirect,
  controlled: ControlledComponent | null
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
      entities.map(e => e.getComponent(EcsyEntity)!.entity),
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
  const transformComponent = getSimComponent(entity, Transform)!;
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

  setEntityAnimation(entity, 'move');
};

export const MovePathSystem = createSystem({
  query: queryComponents({
    entity: ReadEntity(),
    movePath: Write(MovePath),
    moveVelocity: Read(MoveVelocity),
    ecsyEntity: Read(EcsyEntity),
    movePositionDirect: Write(MovePositionDirect),
  }),
})
.withRunFunction(({
  query
}) => {
  query.execute(({ movePath, moveVelocity, ecsyEntity, movePositionDirect }) => {
    const controlled = ecsyEntity.entity.getMutableComponent(ControlledComponent) ?? null;

    updateMovePosition(
      Array.from(query.iter()).map(e => e.entity),
      ecsyEntity.entity,
      movePath,
      moveVelocity,
      movePositionDirect,
      controlled
    );
  });
})
.build();

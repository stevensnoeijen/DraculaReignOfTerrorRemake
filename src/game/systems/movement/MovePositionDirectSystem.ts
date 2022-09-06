
import { createSystem, IEntity, queryComponents, Write, WriteEvents, ReadEntity, Read } from 'sim-ecs';
import { IEventWriter } from 'sim-ecs/dist/events';

import { Transform } from '../../components/Transform';
import { Vector2 } from '../../math/Vector2';
import { MoveVelocity } from '../../components/movement/MoveVelocity';
import { MovePositionDirect } from '../../components/movement/MovePositionDirect';

import { MovePath } from './../../components/movement/MovePath';

import { Idled } from '~/game/events/Idled';


const moveByMoveVelocity = (
  entity: IEntity,
  movePositionDirect: MovePositionDirect,
  moveVelocity: MoveVelocity,
  movePath: Readonly<MovePath>,
  transform: Transform,
  idled: IEventWriter<typeof Idled>
) => {
  if (movePositionDirect.movePosition == null) return;

  if (
    Vector2.distance(
      transform.position,
      movePositionDirect.movePosition
    ) < 1
  ) {
    transform.position = movePositionDirect.movePosition;
    // stop
    movePositionDirect.movePosition = null;
    moveVelocity.velocity = Vector2.ZERO;

    if (movePath.path.length === 0)
      idled.publish(new Idled(entity));

    return;
  }

  moveVelocity.velocity = Vector2.subtracts(
    movePositionDirect.movePosition!,
    transform.position
  ).normalized();
};

export const MovePositionDirectSystem = createSystem({
  idled: WriteEvents(Idled),

  query: queryComponents({
    entity: ReadEntity(),
    movePositionDirect: Write(MovePositionDirect),
    moveVelocity: Write(MoveVelocity),
    movePath: Read(MovePath),
    transform: Write(Transform),
  }),
})
.withRunFunction(({
  idled,
  query
}) => {
  query.execute(({ entity, movePositionDirect, moveVelocity, movePath, transform }) => {
    moveByMoveVelocity(entity, movePositionDirect, moveVelocity, movePath, transform, idled);
  });
})
.build();

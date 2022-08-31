
import { createSystem, queryComponents, Write } from 'sim-ecs';

import { Transform } from '../../components/Transform';
import { Vector2 } from '../../math/Vector2';
import { MoveVelocity } from '../../components/movement/MoveVelocity';
import { MovePositionDirect } from '../../components/movement/MovePositionDirect';


const moveByMoveVelocity = (
  movePositionDirect: MovePositionDirect,
  moveVelocity: MoveVelocity,
  transform: Transform,
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
    return;
  }

  moveVelocity.velocity = Vector2.subtracts(
    movePositionDirect.movePosition!,
    transform.position
  ).normalized();
};

export const MovePositionDirectSystem = createSystem({
  query: queryComponents({
    movePositionDirect: Write(MovePositionDirect),
    moveVelocity: Write(MoveVelocity),
    transform: Write(Transform),
  }),
})
.withRunFunction(({
  query
}) => {
  query.execute(({ movePositionDirect, moveVelocity, transform }) => {
    moveByMoveVelocity(movePositionDirect, moveVelocity, transform);
  });
})
.build();

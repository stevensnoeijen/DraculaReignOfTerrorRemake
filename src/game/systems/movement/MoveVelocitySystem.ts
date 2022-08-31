
import { createSystem, queryComponents, Read, Write } from 'sim-ecs';

import { Transform } from '../../components/Transform';
import { MoveVelocity } from '../../components/movement/MoveVelocity';

const updateTransform = (transform: Transform, moveVelocity: MoveVelocity) => {
  if (moveVelocity.velocity == null) {
    return;
  }

  transform.position.x = transform.position.x + moveVelocity.velocity.x;
  transform.position.y = transform.position.y + moveVelocity.velocity.y;
};

export const MoveVelocitySystem = createSystem({
  query: queryComponents({
    transform: Write(Transform),
    moveVelocity: Read(MoveVelocity),
  }),
})
.withRunFunction(({
  query
}) => {
  query.execute(({ transform, moveVelocity }) => {
    updateTransform(transform, moveVelocity);
  });
})
.build();

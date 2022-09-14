import { createSystem, queryComponents, Read, Write } from 'sim-ecs';

import { Transform } from '../../components/Transform';
import { MoveVelocity } from '../../components/movement/MoveVelocity';

import { GameTime } from './../../GameTime';

import { Vector2 } from '~/game/math/Vector2';

const updateTransform = (transform: Transform, moveVelocity: MoveVelocity) => {
  if (moveVelocity.velocity.equals(Vector2.ZERO)) {
    return;
  }

  const frameRate = 1 / GameTime.delta;
  transform.position.x += moveVelocity.velocity.x * frameRate;
  transform.position.y += moveVelocity.velocity.y * frameRate;
};

export const MoveVelocitySystem = createSystem({
  query: queryComponents({
    transform: Write(Transform),
    moveVelocity: Read(MoveVelocity),
  }),
})
  .withRunFunction(({ query }) => {
    return query.execute(({ transform, moveVelocity }) => {
      return updateTransform(transform, moveVelocity);
    });
  })
  .build();

import { createSystem, queryComponents, Read, Write } from 'sim-ecs';

import { Transform } from '../../components/Transform';

import { Vector2 } from '~/game/math/Vector2';
import { Target } from '~/game/components/ai/Target';
import { Combat } from '~/game/components';
import { isAlive } from '~/game/utils/components';

const ROTATION_DISTANCE = 22;

const unitIsInRotationDistance = (
  sourceTransform: Transform,
  targetTransform: Transform
) =>
  Vector2.distance(sourceTransform.position, targetTransform.position) <=
  ROTATION_DISTANCE;

const updateRotation = (target: Target, transform: Transform) => {
  const targetTransform = target.entity?.getComponent(Transform);
  if (targetTransform == null) return;
  if (!unitIsInRotationDistance(transform, targetTransform)) return;

  transform.rotation = Vector2.angle(
    transform.position,
    targetTransform.position
  );
};

const doCombat = (combat: Combat) => {
  if (combat.attacking == null) return;
  if (!isAlive(combat.attacking)) {
    combat.attacking = null;
    return;
  }

  combat.cooldown.update();
  if (combat.cooldown.isElapsed()) {
    combat.attack();
    combat.cooldown.reset();
  }
};

export const CombatSystem = createSystem({
  query: queryComponents({
    combat: Write(Combat),
    target: Read(Target),
    transform: Write(Transform),
  }),
})
  .withRunFunction(({ query }) => {
    return query.execute(({ target, transform, combat }) => {
      updateRotation(target, transform);
      doCombat(combat);
    });
  })
  .build();

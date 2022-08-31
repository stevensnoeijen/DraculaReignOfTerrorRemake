import { Entity } from 'ecsy';

import { Vector2 } from '../../math/Vector2';
import { Transform } from '../../components/Transform';
import { Comparator, falsePredicate, keepOrder } from '../../utils';

import { hasSimComponent, getSimComponent } from './index';

import { Predicate } from '~/utils/types';

export const isInRange = (
  targetEntity: Entity,
  maxRange: number
): Predicate<Entity> => {
  if (!hasSimComponent(targetEntity, Transform)) {
    return falsePredicate;
  }
  const targetPosition =
    getSimComponent(targetEntity, Transform).position;

  return (entity) => {
    if (!hasSimComponent(entity, Transform)) {
      return false;
    }
    const transform = getSimComponent(entity, Transform);

    return (
      Vector2.distance(targetPosition, transform.position) <= maxRange
    );
  };
};

export const byClosestDistance = (targetEntity: Entity): Comparator<Entity> => {
  if (!hasSimComponent(targetEntity, Transform)) {
    return keepOrder;
  }

  const targetTransform = getSimComponent(targetEntity, Transform);

  return (a: Entity, b: Entity) => {
    if (
      !hasSimComponent(a, Transform) &&
      !hasSimComponent(b, Transform)
    ) {
      return 0;
    }
    if (!hasSimComponent(a, Transform)) {
      return 1;
    }
    if (!hasSimComponent(b, Transform)) {
      return -1;
    }

    const aTransform = getSimComponent(a, Transform);
    const bTransform = getSimComponent(b, Transform);

    return (
      targetTransform.distance(aTransform) -
      targetTransform.distance(bTransform)
    );
  };
};

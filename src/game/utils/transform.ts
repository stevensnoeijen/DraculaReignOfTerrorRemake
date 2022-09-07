import { IEntity } from 'sim-ecs';

import { Vector2 } from '../math/Vector2';
import { Transform } from '../components/Transform';
import { Comparator, falsePredicate, keepOrder } from '../utils';


import { Predicate } from '~/utils/types';

export const isInRange = (
  targetEntity: IEntity,
  maxRange: number
): Predicate<IEntity> => {
  if (!targetEntity.hasComponent(Transform)) {
    return falsePredicate;
  }
  const targetPosition = targetEntity.getComponent(Transform)!.position;

  return (entity) => {
    if (!entity.hasComponent(Transform)) {
      return false;
    }
    const transform = entity.getComponent(Transform)!;

    return (
      Vector2.distance(targetPosition, transform.position) <= maxRange
    );
  };
};

export const byClosestDistance = (targetEntity: IEntity): Comparator<IEntity> => {
  if (!targetEntity.hasComponent(Transform)) {
    return keepOrder;
  }

  const targetTransform = targetEntity.getComponent(Transform)!;

  return (a, b) => {
    if (!a.hasComponent(Transform) && !b.hasComponent(Transform)) {
      return 0;
    }
    if (!a.hasComponent(Transform)) {
      return 1;
    }
    if (!b.hasComponent(Transform)) {
      return -1;
    }

    const aTransform = a.getComponent(Transform)!;
    const bTransform = b.getComponent(Transform)!;

    return (
      targetTransform.distance(aTransform) -
      targetTransform.distance(bTransform)
    );
  };
};

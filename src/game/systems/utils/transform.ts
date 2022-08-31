import { Entity } from 'ecsy';

import { Vector2 } from '../../math/Vector2';
import { TransformComponent } from '../../components/TransformComponent';
import { Comparator, falsePredicate, keepOrder } from '../../utils';

import { hasSimComponent, getSimComponent } from './index';

import { Predicate } from '~/utils/types';

export const isInRange = (
  targetEntity: Entity,
  maxRange: number
): Predicate<Entity> => {
  if (!hasSimComponent(targetEntity, TransformComponent)) {
    return falsePredicate;
  }
  const targetPosition =
    getSimComponent(targetEntity, TransformComponent).position;

  return (entity) => {
    if (!hasSimComponent(entity, TransformComponent)) {
      return false;
    }
    const transformComponent = getSimComponent(entity, TransformComponent);

    return (
      Vector2.distance(targetPosition, transformComponent.position) <= maxRange
    );
  };
};

export const byClosestDistance = (targetEntity: Entity): Comparator<Entity> => {
  if (!hasSimComponent(targetEntity, TransformComponent)) {
    return keepOrder;
  }

  const targetTransformComponent = getSimComponent(targetEntity, TransformComponent);

  return (a: Entity, b: Entity) => {
    if (
      !hasSimComponent(a, TransformComponent) &&
      !hasSimComponent(b, TransformComponent)
    ) {
      return 0;
    }
    if (!hasSimComponent(a, TransformComponent)) {
      return 1;
    }
    if (!hasSimComponent(b, TransformComponent)) {
      return -1;
    }

    const aTransformComponent = getSimComponent(a, TransformComponent);
    const bTransformComponent = getSimComponent(b, TransformComponent);

    return (
      targetTransformComponent.distance(aTransformComponent) -
      targetTransformComponent.distance(bTransformComponent)
    );
  };
};

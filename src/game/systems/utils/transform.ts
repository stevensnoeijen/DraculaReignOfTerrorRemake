import { Entity } from 'ecsy';
import { Vector2 } from '../../math/Vector2';
import { TransformComponent } from '../TransformComponent';
import { Comparator, falsePredicate, keepOrder, Predicate } from '../../utils';

export const isInRange = (
  targetEntity: Entity,
  maxRange: number
): Predicate<Entity> => {
  if (!targetEntity.hasComponent(TransformComponent)) {
    return falsePredicate;
  }
  const targetPosition =
    targetEntity.getComponent(TransformComponent)!.position;

  return (entity) => {
    if (!entity.hasComponent(TransformComponent)) {
      return false;
    }
    const transformComponent = entity.getComponent(TransformComponent)!;

    return (
      Vector2.distance(targetPosition, transformComponent.position) <= maxRange
    );
  };
};

export const byClosestDistance = (targetEntity: Entity): Comparator<Entity> => {
  if (!targetEntity.hasComponent(TransformComponent)) {
    return keepOrder;
  }

  const targetTransformComponent =
    targetEntity.getComponent(TransformComponent)!;

  return (a: Entity, b: Entity) => {
    if (
      !a.hasComponent(TransformComponent) &&
      !b.hasComponent(TransformComponent)
    ) {
      return 0;
    }
    if (!a.hasComponent(TransformComponent)) {
      return 1;
    }
    if (!b.hasComponent(TransformComponent)) {
      return -1;
    }

    const aTransformComponent = a.getComponent(TransformComponent)!;
    const bTransformComponent = b.getComponent(TransformComponent)!;

    return (
      targetTransformComponent.distance(aTransformComponent) -
      targetTransformComponent.distance(bTransformComponent)
    );
  };
};

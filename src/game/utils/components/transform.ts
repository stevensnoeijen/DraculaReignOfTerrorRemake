import { IEntity } from 'sim-ecs';

import { Vector2 } from '../../math/Vector2';
import { Transform } from '../../components/Transform';
import { Size } from '../../components/Size';
import { Position } from '../types';
import { Bounds } from '../../math/collision/Bounds';
import { toGridPosition } from '../grid';

import { keepOrder } from '~/utils/array';
import { Comparator, Predicate } from '~/utils/types';

export const isInRange = (
  targetEntity: IEntity,
  maxRange: number
): Predicate<IEntity> => {
  return (entity) => {
    return distance(targetEntity, entity) <= maxRange;
  };
};

export const distance = (a: IEntity, b: IEntity): number => {
  if (!a.hasComponent(Transform)) {
    throw new Error('Entity a does not have Transform');
  }
  const aTransform = a.getComponent(Transform)!;

  if (!b.hasComponent(Transform)) {
    throw new Error('Entity b does not have Transform');
  }
  const bTransform = b.getComponent(Transform)!;

  return Vector2.distance(aTransform.position, bTransform.position);
};

export const byClosestDistance = (
  targetEntity: IEntity
): Comparator<IEntity> => {
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

export const isPositionInsideEntity = (
  entity: IEntity,
  x: number,
  y: number
): boolean => {
  const transform = entity.getComponent(Transform);
  const size = entity.getComponent(Size);

  if (!transform || !size) {
    // position or/and size isnt set
    return false;
  }

  const bounds = new Bounds(
    transform.position,
    new Vector2(size.width, size.height)
  );
  return bounds.contains(new Vector2(x, y));
};

export const randomRotation = () => {
  const rotation = Math.random() * 360;

  return rotation - (rotation % 90);
};

export const getCell = (entity: IEntity): Position => {
  const transform = entity.getComponent(Transform)!;
  const { x, y } = toGridPosition(transform.position);

  return { x, y };
};

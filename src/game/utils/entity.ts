import { IEntity } from 'sim-ecs';

import { Transform } from '../components/Transform';

import { isPositionInsideEntity } from './components/transform';

import { Predicate } from '~/utils/types';

/**
 * Based on {@link Position} and {@link Size}.
 *
 * @param {Entity} container
 * @param {Entity} object is contained in the container
 *
 * @returns {boolean} true if the objects is inside the container
 */
export const isEntityInsideContainer = (
  object: IEntity,
  container: { x: number; y: number; width: number; height: number }
): boolean => {
  const objectTransform = object.getComponent(Transform);
  if (!objectTransform) {
    return false;
  }

  return (
    objectTransform.position.x >= container.x &&
    objectTransform.position.x <= container.x + container.width &&
    objectTransform.position.y >= container.y &&
    objectTransform.position.y <= container.y + container.height
  );
};

export const isSameEntity = (entity: IEntity): Predicate<IEntity> => {
  return (other) => other.id === entity.id;
};

export const getEntityAtPosition = (
  entities: IEntity[],
  x: number,
  y: number
): IEntity | null => {
  return (
    entities.find((entity) =>
      isPositionInsideEntity(entity, x, y)
    ) ?? null
  );
};

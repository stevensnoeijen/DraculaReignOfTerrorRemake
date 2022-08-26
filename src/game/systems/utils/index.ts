import { Entity } from 'ecsy';

import { EntityHelper } from '../../EntityHelper';

import { SimEcsComponent } from './../SimEcsComponent';
import { AliveComponent } from './../alive/AliveComponent';

import { Predicate } from '~/utils/types';
import { Team } from '~/game/components/Team';
export * from './transform';

export const isOnTeam = (teamId: number): Predicate<Entity> => {
  return (entity: Entity) => {
    const simEcsComponent = entity.getComponent(SimEcsComponent);

    return simEcsComponent?.entity.getComponent(Team)?.id === teamId ?? false;
  };
};

export const isSameEntity = (entity: Entity): Predicate<Entity> => {
  return (other: Entity) => other.id === entity.id;
};

export const getEntityAtPosition = (
  entities: Entity[],
  x: number,
  y: number
): Entity | null => {
  return (
    entities.find((entity) =>
      EntityHelper.isPositionInsideEntity(entity, x, y)
    ) ?? null
  );
};

export const isAlive = (entity: Entity) =>
  entity.getComponent(AliveComponent)?.alive ?? true;

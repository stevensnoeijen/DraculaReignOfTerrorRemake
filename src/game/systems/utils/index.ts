import { Entity } from 'ecsy';

import { EntityHelper } from '../../EntityHelper';
import { TeamComponent } from '../TeamComponent';

import { AliveComponent } from './../alive/AliveComponent';

import { Predicate } from '~/utils/types';
export * from './transform';

export const isOnTeam = (team: number): Predicate<Entity> => {
  return (entity: Entity) => {
    if (!entity.hasComponent(TeamComponent)) {
      return false;
    }

    const teamComponent = entity.getComponent(TeamComponent)!;

    return teamComponent.number === team;
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

export const isAlive = (): Predicate<Entity> => (entity: Entity) =>
  entity.getComponent(AliveComponent)?.alive ?? true;

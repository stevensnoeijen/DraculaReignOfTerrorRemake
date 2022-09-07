import { IEntity } from 'sim-ecs';

import { EntityHelper } from '../EntityHelper';

import { Predicate } from '~/utils/types';
import { Team } from '~/game/components/Team';
import { Alive } from '~/game/components/Alive';
export * from './transform';

export const isOnTeam = (team: Team): Predicate<IEntity> => {
  return (entity) => entity.getComponent(Team)?.equals(team) ?? false;
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
      EntityHelper.isPositionInsideEntity(entity, x, y)
    ) ?? null
  );
};

export const isAlive = (entity: IEntity) =>
  entity.getComponent(Alive)?.alive ?? false;

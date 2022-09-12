import { IEntity } from 'sim-ecs';

import { Alive } from './../../components/Alive';

import { Team } from '~/game/components/Team';
import { Predicate } from '~/utils/types';
import { Collider } from '~/game/components';

export const isAlive = (entity: IEntity) =>
  entity.getComponent(Alive)?.isAlive() ?? false;

export const isOnTeam = (team: Team): Predicate<IEntity> => {
  return (entity) => entity.getComponent(Team)?.equals(team) ?? false;
};

export const isCollider = (entity: IEntity) => entity.hasComponent(Collider);

export * from './transform';

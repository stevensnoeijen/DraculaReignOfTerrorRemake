import { Entity } from 'ecsy';
import { Class } from 'utility-types';
import { IEntity } from 'sim-ecs';

import { EntityHelper } from '../../EntityHelper';

import { SimEcsComponent } from './../SimEcsComponent';

import { Predicate } from '~/utils/types';
import { Team } from '~/game/components/Team';
import { Alive } from '~/game/components/Alive';
export * from './transform';

export const isOnTeam = (teamId: number): Predicate<IEntity> => {
  return (entity) => entity.getComponent(Team)?.id === teamId ?? false;
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

// TODO: remove after migration of ecsy to sim-ecs
export const hasSimComponent = (entity: Entity, type: Class<Object>): boolean => {
  return entity.getComponent(SimEcsComponent)!.entity.hasComponent(type);
};

// TODO: remove after migration of ecsy to sim-ecs
export const getSimComponent = <T extends Object>(entity: Entity, type: Class<T>): T | undefined => {
  return entity.getComponent(SimEcsComponent)!.entity.getComponent(type)!;
};

// TODO: remove after migration of ecsy to sim-ecs
export const removeSimComponent = (entity: Entity, type: Class<Object>) =>
  entity.getComponent(SimEcsComponent)!.entity.removeComponent(type);

export const addSimComponent = (entity: Entity, component: Object) => {
  entity.getComponent(SimEcsComponent)!.entity.addComponent(component);
};

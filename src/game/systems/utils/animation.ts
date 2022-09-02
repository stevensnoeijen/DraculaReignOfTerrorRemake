import { Entity } from 'ecsy';

import { rotationToDirection } from '../../animation/load';
import { Transform } from '../../components/Transform';

import { Animator } from './../../animation/Animator';

import { getSimComponent, hasSimComponent } from './index';

import { UnitState } from '~/game/types';

export const setEntityAnimation = (entity: Entity, state: UnitState): void => {
  if (!hasSimComponent(entity, Animator)) return;

  const transformComponent = getSimComponent(entity, Transform);
  const direction = rotationToDirection(transformComponent?.rotation ?? 0)!;

  getSimComponent(entity, Animator)!.set(state, direction);
};

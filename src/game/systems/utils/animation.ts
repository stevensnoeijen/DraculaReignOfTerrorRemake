import { Entity } from 'ecsy';

import { rotationToDirection } from '../../animation/load';
import { TransformComponent } from '../../components/TransformComponent';

import { Animator } from './../../animation/Animator';
import { SimEcsComponent } from './../SimEcsComponent';

import { getSimComponent } from './index';

import { UnitState } from '~/game/types';

export const setEntityAnimation = (entity: Entity, state: UnitState): void => {
  const simEcsComponent = entity.getComponent(SimEcsComponent);
  if (simEcsComponent == null) {
    return;
  }
  const transformComponent = getSimComponent(entity, TransformComponent);
  const direction = rotationToDirection(transformComponent?.rotation ?? 0)!;

  simEcsComponent.entity.getComponent(Animator)!.set(state, direction);
};

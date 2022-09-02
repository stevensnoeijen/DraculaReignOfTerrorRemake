
import { IEntity } from 'sim-ecs';

import { rotationToDirection } from '../../animation/load';
import { Transform } from '../../components/Transform';
import { Animator } from '../../animation/Animator';

import { UnitState } from '~/game/types';

export const setEntityAnimation = (entity: IEntity, state: UnitState): void => {
  if (!entity.hasComponent(Animator)) return;

  const transform = entity.getComponent(Transform);
  const direction = rotationToDirection(transform?.rotation ?? 0)!;

  entity.getComponent(Animator)!.set(state, direction);
};

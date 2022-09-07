import { IEntity } from 'sim-ecs';

import {
  isOnTeam,
  byClosestDistance,
  isInRange,
  isSameEntity,
  isAlive,
} from '../../../../utils/index';
import { not } from '../../../../utils';

import { Team } from '~/game/components/Team';

export const getEntitiesInRange = (
  sourceEntity: IEntity,
  entities: IEntity[],
  range: number
) => {
  return entities
    .filter(not(isSameEntity(sourceEntity)))
    .filter(
      not(
        isOnTeam(
          sourceEntity.getComponent(Team)!
        )
      )
    )
    .filter(isAlive)
    .filter(isInRange(sourceEntity, range))
    .sort(byClosestDistance(sourceEntity));
};

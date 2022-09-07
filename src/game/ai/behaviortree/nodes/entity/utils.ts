import { IEntity } from 'sim-ecs';

import {
  isSameEntity,
} from '~/game/utils/entity';
import { Team } from '~/game/components/Team';
import { byClosestDistance, isInRange } from '~/game/utils/components';
import { not } from '~/utils/predicate';
import { isAlive, isOnTeam } from '~/game/utils/components';

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

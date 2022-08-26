import { Entity } from 'ecsy';

import {
  isOnTeam,
  byClosestDistance,
  isInRange,
  isSameEntity,
  isAlive,
} from '../../../../systems/utils/index';
import { not } from '../../../../utils';

import { SimEcsComponent } from './../../../../systems/SimEcsComponent';

import { Team } from '~/game/components/Team';

export const getEntitiesInRange = (
  sourceEntity: Entity,
  entities: Entity[],
  range: number
): Entity[] => {
  return entities
    .filter(not(isSameEntity(sourceEntity)))
    .filter(
      not(
        isOnTeam(
          sourceEntity.getComponent(SimEcsComponent)!.entity.getComponent(Team)!.id
        )
      )
    )
    .filter(isAlive())
    .filter(isInRange(sourceEntity, range))
    .sort(byClosestDistance(sourceEntity));
};

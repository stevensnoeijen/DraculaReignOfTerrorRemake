import { Entity } from 'ecsy';
import { TeamComponent } from '../../../../systems/TeamComponent';

import { isEnemy, byClosestDistance, isInRange, isSameEntity, isAlive } from '../../../../systems/utils/index';
import { not } from '../../../../utils';

export const getEntitiesInRange = (sourceEntity: Entity, entities: Entity[], range: number): Entity[] => {
    return entities
        .filter(not(isSameEntity(sourceEntity)))
        .filter(isEnemy(sourceEntity.getComponent(TeamComponent)!.number))
        .filter(isAlive())
        .filter(isInRange(sourceEntity, range))
        .sort(byClosestDistance(sourceEntity));
};
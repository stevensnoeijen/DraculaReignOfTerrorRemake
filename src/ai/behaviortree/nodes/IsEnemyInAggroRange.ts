import { Entity } from "ecsy";

import { isEnemy, byClosestDistance, isInRange, isNotEntity } from './../../../systems/utils/index';
import { TeamComponent } from './../../../systems/TeamComponent';
import { Node, State } from "./Node";

const RANGE = 100;

export class IsEnemyInAggroRange extends Node {
    constructor(private readonly entities: Entity[]) {
        super();
    }

    public evaluate(): State {
        const entity = this.parent!.getData('entity') as Entity;

        const inRangeEntities = this.entities
            .filter(isNotEntity(entity))
            .filter(isEnemy(entity.getComponent(TeamComponent)!.number))
            .filter(isInRange(entity, RANGE))
            .sort(byClosestDistance(entity));

        if (inRangeEntities.length == 0) {
            return this.state = State.FAILURE;
        }

        this.parent!.setData('target', inRangeEntities[0]);

        return this.state = State.SUCCESS;
    }
}


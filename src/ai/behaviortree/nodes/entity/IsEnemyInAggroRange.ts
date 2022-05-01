import { Entity } from "ecsy";

import { Node, State } from "../Node";
import { getEntitiesInRange } from "./utils";

const RANGE = 100;

export class IsEnemyInAggroRange extends Node {
    constructor(private readonly entities: Entity[]) {
        super();
    }

    public evaluate(): State {
        const entity = this.getData('entity') as Entity;

        const inRangeEntities = getEntitiesInRange(entity, this.entities, RANGE);
        if (inRangeEntities.length == 0) {
            return this.state = State.FAILURE;
        }

        this.parent!.setData('target', inRangeEntities[0]);

        return this.state = State.SUCCESS;
    }
}
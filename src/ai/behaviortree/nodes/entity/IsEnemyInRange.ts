import { Entity } from "ecsy";

import { Node, State } from "../Node";
import { getEntitiesInRange } from "./utils";

export class IsEnemyInRange extends Node {
    constructor(
        private readonly entities: Entity[],
        private range: number) {
        super();
    }

    public evaluate(): State {
        const entity = this.getData('entity') as Entity;

        const inRangeEntities = getEntitiesInRange(entity, this.entities, this.range);
        if (inRangeEntities.length == 0) {
            return this.state = State.FAILURE;
        }

        this.parent!.setData('target', inRangeEntities[0]);

        return this.state = State.SUCCESS;
    }
}
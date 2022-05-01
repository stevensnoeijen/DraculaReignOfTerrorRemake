import { Entity } from "ecsy";

import { Node, State } from "../Node";
import { EntityNode } from "./EntityNode";
import { getEntitiesInRange } from "./utils";

export class IsEnemyInRange extends EntityNode {
    constructor(
        private readonly entities: Entity[],
        private range: number) {
        super();
    }

    protected evaluateByEntity(entity: Entity): State {
        const inRangeEntities = getEntitiesInRange(entity, this.entities, this.range);
        if (inRangeEntities.length == 0) {
            return this.failure();
        }

        this.parent!.setData('target', inRangeEntities[0]);

        return this.success();
    }
}
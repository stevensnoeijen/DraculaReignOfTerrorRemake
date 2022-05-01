import { Entity } from "ecsy";

import { IsEnemyInRange } from "./IsEnemyInRange";

const RANGE = 16;

export class IsEnemyInAttackRange extends IsEnemyInRange {
    constructor(entities: Entity[]) {
        super(entities, RANGE);
    }
}


import { Entity } from "ecsy";

import { IsEnemyInRange } from "./IsEnemyInRange";

const RANGE = 100;

export class IsEnemyInAggroRange extends IsEnemyInRange {
    constructor(entities: Entity[]) {
        super(entities, RANGE);
    }
}
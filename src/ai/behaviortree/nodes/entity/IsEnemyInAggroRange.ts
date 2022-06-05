import { Entity } from "ecsy";

import { AttackComponent } from "../../../../systems/AttackComponent";
import { IsEnemyInRange } from "./IsEnemyInRange";

export class IsEnemyInAggroRange extends IsEnemyInRange<AttackComponent> {
    constructor(entities: Entity[]) {
        super(entities, AttackComponent, 'aggroRange');
    }
}
import { HealthComponent } from './../../../../systems/health/HealthComponent';
import { Entity } from "ecsy";
import { State } from "../Node";
import { EntityNode } from "./EntityNode";

export class Attack extends EntityNode {
    protected evaluateByEntity(entity: Entity): State {
        const target = this.getData('target') as Entity;

        target.getMutableComponent(HealthComponent)!.points -= 10;

        return this.success();
    }
}
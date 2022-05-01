import { TargetComponent } from './../../../../systems/TargetComponent';
import { Entity } from "ecsy";
import { State } from "../Node";
import { EntityNode } from './EntityNode';

export class UnsetTarget extends EntityNode {
    protected evaluateByEntity(entity: Entity): State {
        if (!entity.hasComponent(TargetComponent)) {
            return this.failure();
        }
        const targetComponent = entity.getMutableComponent(TargetComponent)!;
        if (targetComponent.target == null) {
            return this.failure();
        }
        targetComponent.target = null;
        
        return this.success();
    }
}
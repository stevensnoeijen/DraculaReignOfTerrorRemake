import { TargetComponent } from './../../../../systems/TargetComponent';
import { Entity } from 'ecsy';
import { Node, State } from "../Node";
import { EntityNode } from './EntityNode';

export class SetTarget extends EntityNode {
    protected evaluateByEntity(entity: Entity): State {
        const target = this.getData('target') as Entity|null;

        if (target == null || !entity.hasComponent(TargetComponent)) {
            return this.failure();
        }

        const targetComponent = entity.getMutableComponent(TargetComponent)!;
        targetComponent.target = target;

        return this.success();
    }
}
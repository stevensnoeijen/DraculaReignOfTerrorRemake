import { Entity } from 'ecsy';

import { Node, State } from "../Node";
import { EntityNode } from './EntityNode';
import { TargetComponent } from '../../../../systems/ai/TargetComponent';

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
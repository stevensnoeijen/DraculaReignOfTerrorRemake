import { Entity } from "ecsy";

import { State } from "../Node";
import { EntityNode } from "./EntityNode";
import { FollowComponent } from './../../../../systems/movement/FollowComponent';
import { TargetComponent } from '../../../../systems/ai/TargetComponent';

export class Follow extends EntityNode {
    protected evaluateByEntity(entity: Entity): State {
        const targetComponent = entity.getComponent(TargetComponent);
        const followComponent = entity.getMutableComponent(FollowComponent);

        if (targetComponent == null || followComponent == null) {
            return this.failure();
        }

        followComponent.follow = targetComponent.target;

        return this.success();
    }
}
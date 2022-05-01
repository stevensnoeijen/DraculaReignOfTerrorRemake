import { TargetComponent } from '../../../../systems/TargetComponent';
import { Entity } from "ecsy";
import { Node, State } from "../Node";

export class HasTarget extends Node {
    public evaluate(): State {
        const entity = this.getData('entity') as Entity|null;
        if (entity == null) {
            return this.failure();
        }

        if (!entity.hasComponent(TargetComponent)) {
            return this.failure();
        }
        const targetComponent = entity.getComponent(TargetComponent)!;
        if (targetComponent.target == null) {
            return this.failure();
        }
        
        return this.success();
    }
}
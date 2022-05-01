import { TargetComponent } from './../../../../systems/TargetComponent';
import { Entity } from "ecsy";
import { Node, State } from "../Node";

export class UnsetTarget extends Node {
    public evaluate(): State {
        const entity = this.getData('entity') as Entity|null;
        if (entity == null) {
            return this.state = State.FAILURE;
        }

        if (!entity.hasComponent(TargetComponent)) {
            return this.state = State.FAILURE;
        }
        const targetComponent = entity.getMutableComponent(TargetComponent)!;
        if (targetComponent.target == null) {
            return this.state = State.FAILURE;
        }
        targetComponent.target = null;
        
        return this.state = State.SUCCESS;
    }
}
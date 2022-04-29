import { TargetComponent } from './../../../../systems/TargetComponent';
import { Entity } from 'ecsy';
import { Node, State } from "../Node";

export class SetTarget extends Node {
    public evaluate(): State {
        const entity = this.getData('entity') as Entity|null;
        const target = this.getData('target') as Entity|null;

        if (entity == null || target == null || !entity.hasComponent(TargetComponent)) {
            return this.state = State.FAILURE; 
        }

        const targetComponent = entity.getMutableComponent(TargetComponent)!;
        targetComponent.target = target;

        return this.state = State.SUCCESS;
    }
}
import { Entity } from "ecsy";

import { MovePositionDirectComponent } from "../../../../systems/movement/MovePositionDirectComponent";
import { Node, State } from "../Node";

export class IsMoving extends Node {
    public evaluate(): State {
        const entity = this.getData('entity') as Entity|null;
        if (entity == null) {
            return this.failure();
        }

        if (!entity.hasComponent(MovePositionDirectComponent)) {
            return this.failure();
        }
        const movePositionDirectComponent = entity.getComponent(MovePositionDirectComponent)!;
        if (movePositionDirectComponent.movePosition == null) {
            return this.failure();
        }


        return this.success();
    }
}
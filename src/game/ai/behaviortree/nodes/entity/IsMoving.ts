import { Entity } from "ecsy";

import { MovePositionDirectComponent } from "../../../../systems/movement/MovePositionDirectComponent";
import { State } from "../Node";
import { EntityNode } from "./EntityNode";

export class IsMoving extends EntityNode {
    protected evaluateByEntity(entity: Entity): State {
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
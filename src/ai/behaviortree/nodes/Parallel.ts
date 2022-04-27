import { Node, State } from "./Node";

export class Parallel extends Node {
    public evaluate(): State {
        let failedChildren = 0;
        let runningChildren = 0;

        for(const child of this.children) {
            switch(child.evaluate()) {
                case State.SUCCESS:
                    continue;
                case State.RUNNING:
                    runningChildren++;
                case State.FAILURE:
                default:
                    failedChildren++;
                    continue;
                
            }
        }

        if (failedChildren === this.children.length) {
            return State.FAILURE;
        } else {
            return runningChildren > 0 ? State.RUNNING : State.SUCCESS;
        }
    }
}
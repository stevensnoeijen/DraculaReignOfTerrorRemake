import { Node, State } from "./Node";

/**
 * Processes all of its children at the same time and only "computes" its success/failure state at the end of all child executions.
 */
export class Parallel extends Node {
    constructor(children: Node[], public readonly requireAllSuccess = true) {
        super(children);
    }

    public evaluate(): State {
        if (this.children.length === 0) {
            return this.state = State.SUCCESS;
        }

        let failedChildren = 0;
        let runningChildren = 0;

        for(const child of this.children) {
            switch(child.evaluate()) {
                case State.SUCCESS:
                    continue;
                case State.RUNNING:
                    runningChildren++;
                    continue;
                case State.FAILURE:
                default:
                    failedChildren++;
                    continue;
            }
        }

        if ((failedChildren > 0 && this.requireAllSuccess) || failedChildren === this.children.length) {
            return this.state = State.FAILURE;
        } else {
            return this.state = runningChildren > 0 ? State.RUNNING : State.SUCCESS;
        }
    }
}
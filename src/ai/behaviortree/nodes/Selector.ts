import { Node, State } from "./Node";

/**
 * This is the "Or" operator.
 */
export class Selector extends Node {
    public evaluate(): State {
        for(const child of this.children) {
            const state = child.evaluate();

            if (state === State.SUCCESS) {
                return this.state = State.SUCCESS;
            } else if (state === State.RUNNING) {
                this.state = State.RUNNING;
            }
        }
    
        if (this.state === State.CREATED) {
            this.state = State.FAILURE;
        }
        return this.state;
    }
}
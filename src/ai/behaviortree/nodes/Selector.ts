import { Node, State } from "./Node";

/**
 * This is the "Or" operator.
 */
export class Selector extends Node {
    public evaluate(): State {
        if (!this.hasChildren()) {
            return this.state = State.SUCCESS;
        }

        for(const child of this.children) {
            const state = child.evaluate();

            if (state === State.SUCCESS) {
                return this.state = State.SUCCESS;
            } else if (state === State.RUNNING) {
                this.state = State.RUNNING;
            }
        }
    
        if (this.state === State.FAILURE) {
            this.state = State.FAILURE;
        } else if (this.children.length === 0) {
            this.state = State.SUCCESS;
        }
        return this.state;
    }
}
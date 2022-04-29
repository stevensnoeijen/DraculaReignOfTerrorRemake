import { Node, State } from "../Node";

const stateMap = new Map<State, State>([
    [State.FAILURE, State.SUCCESS],
    [State.SUCCESS, State.FAILURE],
    [State.RUNNING, State.RUNNING],
]);

/**
 * This is the "Not" operator (!).
 */
export class Inventer extends Node {
    public evaluate(): State {
        if (!this.hasChildren()) {
            return State.FAILURE;
        }
        
        const childState = this.children[0].evaluate();
        if (!stateMap.has(childState)) {
            return State.FAILURE;
        }

        return this.state = stateMap.get(childState)!;
    }
}
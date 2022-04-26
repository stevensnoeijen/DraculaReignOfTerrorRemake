import { Node, State } from "./Node";
import { Selector } from "./Selector";

describe('Selector', () => {
    describe('evaluate', () => {
        it('should fail when no children are set', () => {
            const selector = new Selector([]);

            expect(selector.evaluate()).toEqual(State.FAILURE);
        });

        class ReturnStateCheck extends Node {
            constructor(state: State) {
                super([]);

                this.state = state;
            }
        }

        it('should fail when all children fail', () => {
            const selector = new Selector([
                new ReturnStateCheck(State.FAILURE),
                new ReturnStateCheck(State.FAILURE),
                new ReturnStateCheck(State.FAILURE),
            ]);

            expect(selector.evaluate()).toEqual(State.FAILURE);
        });

        it('should return success when one of the children returned success', () => {
            const selector = new Selector([
                new ReturnStateCheck(State.FAILURE),
                new ReturnStateCheck(State.SUCCESS),
            ]);

            expect(selector.evaluate()).toEqual(State.SUCCESS);
        });

        it('should return running when one of the children returned running', () => {
            const selector = new Selector([
                new ReturnStateCheck(State.FAILURE),
                new ReturnStateCheck(State.RUNNING),
            ]);

            expect(selector.evaluate()).toEqual(State.RUNNING);
        });

        it('should return success when there are also running children', () => {
            const selector = new Selector([
                new ReturnStateCheck(State.RUNNING),
                new ReturnStateCheck(State.SUCCESS),
            ]);

            expect(selector.evaluate()).toEqual(State.SUCCESS);
        });
    });
});
import { Always } from './Always';
import { Inventer } from './Inventer';
import { State } from "./Node";

describe('Inventer', () => {
    describe('evaluate', () => {
        it('should return failure when there are no children', () => {
            const inventer = new Inventer([]);

            expect(inventer.evaluate()).toEqual(State.FAILURE);
        });

        it('should invert first child when multiple are given', () => {
            const inventer = new Inventer([
                new Always(State.FAILURE),
                new Always(State.RUNNING),
            ]);

            expect(inventer.evaluate()).toEqual(State.SUCCESS);
        });

        it('should return failure when child has no state', () => {
            const inventer = new Inventer([
                new Always(undefined as unknown as State),
            ]);

            expect(inventer.evaluate()).toEqual(State.FAILURE);
        });

        it.each([
            [State.FAILURE, State.SUCCESS],
            [State.SUCCESS, State.FAILURE],
            [State.RUNNING, State.RUNNING],
        ])('should return %s when %s is given', (childState, returnValue) => {
            const inventer = new Inventer([
                new Always(childState),
            ]);

            expect(inventer.evaluate()).toEqual(returnValue);
        });
    });
});
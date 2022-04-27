import { State } from './Node';
import { Parallel } from './Parallel';
import { Always } from './Always';

describe('Parallel', () => {
    describe('evaluate', () => {
        it('should return failure when all children are failed', () => {
            const parallel = new Parallel([
                new Always(State.FAILURE),
                new Always(State.FAILURE),
                new Always(State.FAILURE),
            ]);

            expect(parallel.evaluate()).toEqual(State.FAILURE);
        });

        it('should return running when any child is running', () => {
            const parallel = new Parallel([
                new Always(State.RUNNING),
                new Always(State.FAILURE),
                new Always(State.SUCCESS),
            ]);

            expect(parallel.evaluate()).toEqual(State.RUNNING);
        });

        it('should return success if all children are success', () => {
            const parallel = new Parallel([
                new Always(State.SUCCESS),
                new Always(State.SUCCESS),
                new Always(State.SUCCESS),
            ]);

            expect(parallel.evaluate()).toEqual(State.SUCCESS);
        });
    });
});
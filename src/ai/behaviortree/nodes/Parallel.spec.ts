import { State } from './Node';
import { Parallel } from './Parallel';
import { Always } from './Always';

describe('Parallel', () => {
    describe('constructor', () => {
        it('should set defaults', () => {
            const parallel = new Parallel([]);

            expect(parallel.requireAllSuccess).toBe(true);
        });
    });

    describe('evaluate', () => {
        it('should return success when children are 0', () => {
            const parallel = new Parallel([]);

            expect(parallel.evaluate()).toEqual(State.SUCCESS);
        });

        it('should return failure when all children are failed', () => {
            const parallel = new Parallel([
                new Always(State.FAILURE),
                new Always(State.FAILURE),
                new Always(State.FAILURE),
            ]);

            expect(parallel.evaluate()).toEqual(State.FAILURE);
        });

        it('should return running when any child is running and requireAllSuccess is true', () => {
            const parallel = new Parallel([
                new Always(State.RUNNING),
                new Always(State.SUCCESS),
                new Always(State.SUCCESS),
            ], true);

            expect(parallel.evaluate()).toEqual(State.RUNNING);
        });

        it('should return success if all children are success and requireAllSuccess is true', () => {
            const parallel = new Parallel([
                new Always(State.SUCCESS),
                new Always(State.SUCCESS),
                new Always(State.SUCCESS),
            ], true);

            expect(parallel.evaluate()).toEqual(State.SUCCESS);
        });

        it('should return success if one child is success and requireAllSuccess is false', () => {
            const parallel = new Parallel([
                new Always(State.SUCCESS),
                new Always(State.FAILURE),
                new Always(State.FAILURE),
            ], false);

            expect(parallel.evaluate()).toEqual(State.SUCCESS);
        });
    });
});
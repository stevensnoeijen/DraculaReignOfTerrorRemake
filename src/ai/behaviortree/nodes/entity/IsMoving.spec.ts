import { World } from 'ecsy';

import { Vector2 } from '../../../../math/Vector2';
import { MovePositionDirectComponent } from '../../../../systems/movement/MovePositionDirectComponent';
import { State } from '../Node';
import { IsMoving } from './IsMoving';

describe('IsMoving', () => {
    describe('evaluateByEntity', () => {
        const world = new World()
            .registerComponent(MovePositionDirectComponent);

        it('should return failure when entity has no MovePositionDirectComponent', () => {
            const entity = world.createEntity();
            const setTarget = new IsMoving();
            setTarget.setData('entity', entity)

            expect(setTarget.evaluate()).toBe(State.FAILURE);
        });

        it('should return failure when entity\'s MovePositionDirectComponent movePosition is null', () => {
            const entity = world.createEntity()
                .addComponent(MovePositionDirectComponent, {
                    movePosition: null,
                });
            const setTarget = new IsMoving();
            setTarget.setData('entity', entity)

            expect(setTarget.evaluate()).toBe(State.FAILURE);
        });

        it('should return success when entity\'s MovePositionDirectComponent movePosition is null', () => {
            const entity = world.createEntity()
                .addComponent(MovePositionDirectComponent, {
                    movePosition: new Vector2(1, 2),
                });
            const setTarget = new IsMoving();
            setTarget.setData('entity', entity)

            expect(setTarget.evaluate()).toBe(State.SUCCESS);
        });
    });
});
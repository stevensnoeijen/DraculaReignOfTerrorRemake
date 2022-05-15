import { World } from 'ecsy';

import { SetTarget } from './SetTarget';
import { TargetComponent } from '../../../../systems/ai/TargetComponent';
import { State } from '../Node';

describe('SetTarget', () => {
    describe('evaluate', () => {
        const world = new World()
            .registerComponent(TargetComponent);

        it('should return failure when entity has no TargetComponent', () => {
            const entity = world.createEntity();
            const target = world.createEntity();

            const setTarget = new SetTarget();
            setTarget.setData('entity', entity);
            setTarget.setData('target', target);

            expect(setTarget.evaluate()).toBe(State.FAILURE);
        });

        it('should return failure when no target is set', () => {
            const entity = world.createEntity()
                .addComponent(TargetComponent);

            const setTarget = new SetTarget();
            setTarget.setData('entity', entity);

            expect(setTarget.evaluate()).toBe(State.FAILURE);
            expect(entity.getComponent(TargetComponent)!.target).toBeNull();
        });
        


        it('should set entity\'s TargetComponent and return success', () => {
            const entity = world.createEntity()
                .addComponent(TargetComponent);
            const target = world.createEntity();

            const setTarget = new SetTarget();
            setTarget.setData('entity', entity);
            setTarget.setData('target', target);

            expect(setTarget.evaluate()).toBe(State.SUCCESS);
            expect(entity.getComponent(TargetComponent)!.target).toBe(target);
        });
    });
});
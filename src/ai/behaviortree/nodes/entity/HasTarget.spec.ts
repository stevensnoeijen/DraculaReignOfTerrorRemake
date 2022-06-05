import { World } from "ecsy";

import { TargetComponent } from "../../../../systems/ai/TargetComponent";
import { State } from '../Node';
import { HasTarget } from "./HasTarget";

describe('HasTarget', () => {
    describe('evaluate', () => {
        const world = new World()
            .registerComponent(TargetComponent);

        it('should return failure when entity has no TargetComponent', () => {
            const entity = world.createEntity();

            const hasTarget = new HasTarget();
            hasTarget.setData('entity', entity);

            expect(hasTarget.evaluate()).toBe(State.FAILURE);
        });

        it('should return failure when entity has no target set in TargetComponent', () => {
            const entity = world.createEntity()
                .addComponent(TargetComponent, {
                    target: null,
                });

            const hasTarget = new HasTarget();
            hasTarget.setData('entity', entity);

            expect(hasTarget.evaluate()).toBe(State.FAILURE);
        });

        it('should return success when entity has target set in TargetComponent', () => {
            const entity = world.createEntity()
                .addComponent(TargetComponent, {
                    target: world.createEntity(),
                });

            const hasTarget = new HasTarget();
            hasTarget.setData('entity', entity);

            expect(hasTarget.evaluate()).toBe(State.SUCCESS);
        });
    });
});
import { HealthComponent } from './../../../../systems/health/HealthComponent';
import { World } from 'ecsy';
import { State } from '../Node';
import { Attack } from './Attack';
describe('Attack', () => {
    describe('evaluate', () => {
        const world = new World()
            .registerComponent(HealthComponent);

        it('should minus 10 health', () => {
            const entity = world.createEntity();
            const target = world.createEntity()
                .addComponent(HealthComponent, {
                    points: 100,
                });

            const attack = new Attack();
            attack.setData('entity', entity);
            attack.setData('target', target);

            expect(attack.evaluate()).toBe(State.SUCCESS);
            expect(target.getComponent(HealthComponent)!.points).toEqual(90);
        });
    });
});
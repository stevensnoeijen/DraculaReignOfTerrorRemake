import { TeamComponent } from './../TeamComponent';
import { World } from 'ecsy';
import { isEnemy } from './index';

describe('isEnemy', () => {
    const world = new World()
        .registerComponent(TeamComponent);

    it('should return false if entity has no TeamComponent', () => {
        const entity = world.createEntity();
        const predicate = isEnemy(1);

        expect(predicate(entity)).toBe(false);
    });

    it('should return false if entity team is the same', () => {
        const entity = world.createEntity()
            .addComponent(TeamComponent, {
                number: 1,
            });
        const predicate = isEnemy(1);

        expect(predicate(entity)).toBe(false);
    });

    it('should return true if entity team is different', () => {
        const entity = world.createEntity()
            .addComponent(TeamComponent, {
                number: 2,
            });
        const predicate = isEnemy(1);

        expect(predicate(entity)).toBe(true);
    });
});
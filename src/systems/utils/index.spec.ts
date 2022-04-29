import { TeamComponent } from './../TeamComponent';
import { World } from 'ecsy';
import { isEnemy, isSameEntity } from './index';

const world = new World()
        .registerComponent(TeamComponent);

describe('isEnemy', () => {
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

describe('isSameEntity', () => {
    it('should return false entities are different', () => {
        const a = world.createEntity();
        const b = world.createEntity();

        const predictate = isSameEntity(a);

        expect(predictate(b)).toBe(false);
    });

    it('should return true if given entities are the same', () => {
        const a = world.createEntity();

        const predictate = isSameEntity(a);

        expect(predictate(a)).toBe(true);
    });
});
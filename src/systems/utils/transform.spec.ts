import { World } from 'ecsy';

import { byClosestDistance, isInRange } from './transform';
import { Vector2 } from '../../math/Vector2';
import { TransformComponent } from './../TransformComponent';
import { Position } from '../../utils';

const world = new World();
world.registerComponent(TransformComponent);

const createRandomEntities = (length: number = 30, minPosition: Position = { x: 3, y: 3}, maxPosition: Position = { x: 100, y: 100 }) => {
    return Array.from({ length: length }).map(() => {
        return world.createEntity()
            .addComponent(TransformComponent, {
                position: new Vector2(
                    Math.round(Math.random() * maxPosition.x) + minPosition.x,
                    Math.round(Math.random() * maxPosition.y) + minPosition.y
                ),
            });
    });
};

describe('isInRange', () => {
    it('should filter everything when targetEntity has no TransformComponent', () => {
        const targetEntity = world.createEntity();

        const filter = isInRange(targetEntity, 100);

        const filtered = [
            ...createRandomEntities(),
        ].filter(filter);

        expect(filtered).toHaveLength(0);
    });

    it('should filter out entities that have no TransformComponent', () => {
        const targetEntity = world.createEntity()
            .addComponent(TransformComponent, {
                position: Vector2.ZERO,
            });
        const entitiesWithoutTransform = createRandomEntities();
        entitiesWithoutTransform.forEach((entity) => entity.removeComponent(TransformComponent));

        const filter = isInRange(targetEntity, 100);

        const filtered = [
            ...entitiesWithoutTransform,
        ].filter(filter);

        expect(filtered).toHaveLength(0);
    });

    it('should filter out entities that are out of given range', () => {
        const targetEntity = world.createEntity()
            .addComponent(TransformComponent, {
                position: Vector2.ZERO,
            });
        const inRangeEntities = createRandomEntities(10, { x: 3, y: 0 }, { x: 50, y: 0 });
        const outOfRangeEntities = createRandomEntities(10, { x: 150, y: 0 }, { x: 200, y: 0 });

        const filter = isInRange(targetEntity, 100);

        const filtered = [
            ...inRangeEntities,
            ...outOfRangeEntities,
        ].filter(filter);

        expect(filtered).toHaveLength(10);
    });
});

describe('byClosestDistance', () => {
    it('should keep order sort when targetEntity has no TransformComponent', () => {
        const targetEntity = world.createEntity();
        
        const entities = createRandomEntities();
        const sorted = [
            ...entities,
        ].sort(byClosestDistance(targetEntity));

        expect(sorted).toEqual(entities);
    });

    it('should sort entities without TransformComponent to the back', () => {
        const targetEntity = world.createEntity()
            .addComponent(TransformComponent, {
                position: Vector2.ZERO,
            });
        
        const entities = createRandomEntities();
        entities[0].removeComponent(TransformComponent);
        entities[1].removeComponent(TransformComponent);
        entities[2].removeComponent(TransformComponent);

        const sorted = [
            ...entities,
        ].sort(byClosestDistance(targetEntity));

        const last3Ids = sorted.slice(-3).map((entity) => entity.id);
        expect(last3Ids).toEqual([
            entities[0].id,
            entities[1].id,
            entities[2].id,
        ]);
    });

    it('should sort entities by distance', () => {
        const targetEntity = world.createEntity()
            .addComponent(TransformComponent, {
                position: Vector2.ZERO,
            });
        const closestEntity = world.createEntity()
            .addComponent(TransformComponent, {
                position: new Vector2(1, 1),
            });

        const sorted = [
            ...createRandomEntities(),
            closestEntity,
        ].sort(byClosestDistance(targetEntity));

        expect(sorted[0]).toBe(closestEntity);
    });
});
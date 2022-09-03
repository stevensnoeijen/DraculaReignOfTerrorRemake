import { IWorld, buildWorld } from 'sim-ecs';

import { Vector2 } from '../../math/Vector2';
import {
  constructCreateRandomEntities,
  CreateRandomEntities,
} from '../../__tests__/utils';
import { Transform } from '../../components/Transform';

import { byClosestDistance, isInRange } from './transform';


let world: IWorld;
let createRandomEntities: CreateRandomEntities;

beforeEach(() => {
  world = buildWorld().build();
  createRandomEntities = constructCreateRandomEntities(world);
});

describe('isInRange', () => {
  it('should filter everything when targetEntity has no TransformComponent', () => {
    const targetEntity = world.buildEntity().build();

    const filter = isInRange(targetEntity, 100);

    const filtered = [...createRandomEntities()].filter(filter);

    expect(filtered).toHaveLength(0);
  });

  it('should filter out entities that have no TransformComponent', () => {
    const targetEntity = world.buildEntity()
      .with(new Transform(Vector2.ZERO))
      .build();

    const entitiesWithoutTransform = createRandomEntities();
    entitiesWithoutTransform.forEach((entity) =>
      entity.removeComponent(Transform)
    );

    const filter = isInRange(targetEntity, 100);

    const filtered = [...entitiesWithoutTransform].filter(filter);

    expect(filtered).toHaveLength(0);
  });

  it('should filter out entities that are out of given range', () => {
    const targetEntity = world.buildEntity()
      .with(new Transform(Vector2.ZERO))
      .build();
    const inRangeEntities = createRandomEntities(
      10,
      { x: 3, y: 0 },
      { x: 50, y: 0 }
    );
    const outOfRangeEntities = createRandomEntities(
      10,
      { x: 150, y: 0 },
      { x: 200, y: 0 }
    );

    const filter = isInRange(targetEntity, 100);

    const filtered = [...inRangeEntities, ...outOfRangeEntities].filter(filter);

    expect(filtered).toHaveLength(10);
  });
});

describe('byClosestDistance', () => {
  it('should keep order sort when targetEntity has no TransformComponent', () => {
    const targetEntity = world.buildEntity()
      .build();

    const entities = createRandomEntities();
    const sorted = [...entities].sort(byClosestDistance(targetEntity));

    expect(sorted).toEqual(entities);
  });

  it('should sort entities without TransformComponent to the back', () => {
    const targetEntity = world.buildEntity()
      .with(new Transform(Vector2.ZERO))
      .build();

    const entities = createRandomEntities();
    entities[0].removeComponent(Transform);
    entities[1].removeComponent(Transform);
    entities[2].removeComponent(Transform);

    const sorted = [...entities].sort(byClosestDistance(targetEntity));

    const last3Ids = sorted.slice(-3).map((entity) => entity.id);
    expect(last3Ids).toEqual([entities[0].id, entities[1].id, entities[2].id]);
  });

  it('should sort entities by distance', () => {
    const targetEntity = world.buildEntity()
      .with(new Transform(Vector2.ZERO))
      .build();

    const closestEntity = world.buildEntity()
          .with(new Transform(Vector2.ZERO))
          .build();

    const sorted = [...createRandomEntities(), closestEntity].sort(
      byClosestDistance(targetEntity)
    );

    expect(sorted[0]).toBe(closestEntity);
  });
});

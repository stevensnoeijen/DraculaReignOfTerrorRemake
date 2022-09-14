import { IWorld, buildWorld } from 'sim-ecs';

import { Vector2 } from '../../math/Vector2';
import {
  constructCreateRandomEntities,
  CreateRandomEntities,
} from '../../__tests__/utils';
import { Transform } from '../../components/Transform';

import { MovePositionDirect } from './../../components/movement/MovePositionDirect';
import { CELL_SIZE } from './../../constants';
import { byClosestDistance, isInRange, getOccupiedCells } from './transform';

let world: IWorld;
let createRandomEntities: CreateRandomEntities;

beforeEach(() => {
  world = buildWorld().build();
  createRandomEntities = constructCreateRandomEntities(world);
});

describe('isInRange', () => {
  it('should throw error when targetEntity has no Transform', () => {
    const targetEntity = world.buildEntity().build();

    const filter = isInRange(targetEntity, 100);

    expect(() => [...createRandomEntities()].filter(filter)).toThrow();
  });

  it('should error if entities have no Transform', () => {
    const targetEntity = world
      .buildEntity()
      .with(new Transform(Vector2.ZERO))
      .build();

    const entitiesWithoutTransform = createRandomEntities();
    entitiesWithoutTransform.forEach((entity) =>
      entity.removeComponent(Transform)
    );

    const filter = isInRange(targetEntity, 100);

    expect(() => [...entitiesWithoutTransform].filter(filter)).toThrow();
  });

  it('should filter out entities that are out of given range', () => {
    const targetEntity = world
      .buildEntity()
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
  it(`should keep order sort
    when targetEntity has no TransformComponent`, () => {
    const targetEntity = world.buildEntity().build();

    const entities = createRandomEntities();
    const sorted = [...entities].sort(byClosestDistance(targetEntity));

    expect(sorted).toEqual(entities);
  });

  it('should sort entities without TransformComponent to the back', () => {
    const targetEntity = world
      .buildEntity()
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
    const targetEntity = world
      .buildEntity()
      .with(new Transform(Vector2.ZERO))
      .build();

    const closestEntity = world
      .buildEntity()
      .with(new Transform(Vector2.ZERO))
      .build();

    const sorted = [...createRandomEntities(), closestEntity].sort(
      byClosestDistance(targetEntity)
    );

    expect(sorted[0]).toBe(closestEntity);
  });
});

describe('getOccupiedCells', () => {
  it(`should return empty array
    when the entity has no Transform component`, () => {
    const entity = world.buildEntity().build();

    expect(getOccupiedCells(entity)).toHaveLength(0);
  });

  it(`should return transform location
    when the entity has Transform component`, () => {
    const entity = world
      .buildEntity()
      .with(new Transform(new Vector2(1 * CELL_SIZE, 2 * CELL_SIZE)))
      .build();

    const cells = getOccupiedCells(entity);
    expect(cells).toHaveLength(1);
    expect(cells[0]).toEqual({ x: 1, y: 2 });
  });

  it('should return MovePositionDirect location if set', () => {
    const entity = world
      .buildEntity()
      .with(new Transform(new Vector2(1 * CELL_SIZE, 2 * CELL_SIZE)))
      .with(new MovePositionDirect(new Vector2(2 * CELL_SIZE, 2 * CELL_SIZE)))
      .build();

    const cells = getOccupiedCells(entity);
    expect(cells).toHaveLength(2);
    expect(cells[1]).toEqual({ x: 2, y: 2 });
  });
});

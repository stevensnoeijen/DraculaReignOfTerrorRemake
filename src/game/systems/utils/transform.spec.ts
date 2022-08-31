import { World } from 'ecsy';
import { IWorld, buildWorld } from 'sim-ecs';

import { Vector2 } from '../../math/Vector2';
import {
  constructCreateRandomEntities,
  CreateRandomEntities,
} from '../../__tests__/utils';
import { TransformComponent } from '../../components/TransformComponent';

import { SimEcsComponent } from './../SimEcsComponent';
import { byClosestDistance, isInRange } from './transform';

import { removeSimComponent } from './index';

let world: World;
let newWorld: IWorld;
let createRandomEntities: CreateRandomEntities;

beforeEach(() => {
  world = new World()
    .registerComponent(TransformComponent)
    .registerComponent(SimEcsComponent);
  newWorld = buildWorld().build();
  createRandomEntities = constructCreateRandomEntities(world);
});

describe('isInRange', () => {
  it('should filter everything when targetEntity has no TransformComponent', () => {
    const targetEntity = world.createEntity();
    targetEntity.addComponent(SimEcsComponent, {
      entity: newWorld.buildEntity().build(),
    });

    const filter = isInRange(targetEntity, 100);

    const filtered = [...createRandomEntities()].filter(filter);

    expect(filtered).toHaveLength(0);
  });

  it('should filter out entities that have no TransformComponent', () => {
    const targetEntity = world.createEntity();
    targetEntity.addComponent(SimEcsComponent, {
      entity: newWorld.buildEntity()
        .with(new TransformComponent({
          position: Vector2.ZERO,
        }))
        .build(),
    });

    const entitiesWithoutTransform = createRandomEntities();
    entitiesWithoutTransform.forEach((entity) =>
      removeSimComponent(entity, TransformComponent)
    );

    const filter = isInRange(targetEntity, 100);

    const filtered = [...entitiesWithoutTransform].filter(filter);

    expect(filtered).toHaveLength(0);
  });

  it('should filter out entities that are out of given range', () => {
    const targetEntity = world.createEntity();
    targetEntity.addComponent(SimEcsComponent, {
      entity: newWorld.buildEntity()
        .with(new TransformComponent({
          position: Vector2.ZERO,
        }))
        .build(),
    });
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
    const targetEntity = world.createEntity();
    targetEntity.addComponent(SimEcsComponent, {
      entity: newWorld.buildEntity()
        .build(),
    });

    const entities = createRandomEntities();
    const sorted = [...entities].sort(byClosestDistance(targetEntity));

    expect(sorted).toEqual(entities);
  });

  it('should sort entities without TransformComponent to the back', () => {
    const targetEntity = world.createEntity();
    targetEntity.addComponent(SimEcsComponent, {
      entity: newWorld.buildEntity()
        .with(new TransformComponent({
          position: Vector2.ZERO,
        }))
        .build(),
    });

    const entities = createRandomEntities();
    removeSimComponent(entities[0], TransformComponent);
    removeSimComponent(entities[1], TransformComponent);
    removeSimComponent(entities[2], TransformComponent);

    const sorted = [...entities].sort(byClosestDistance(targetEntity));

    const last3Ids = sorted.slice(-3).map((entity) => entity.id);
    expect(last3Ids).toEqual([entities[0].id, entities[1].id, entities[2].id]);
  });

  it('should sort entities by distance', () => {
    const targetEntity = world.createEntity();
    targetEntity.addComponent(SimEcsComponent, {
      entity: newWorld.buildEntity()
        .with(new TransformComponent({
          position: Vector2.ZERO,
        }))
        .build(),
    });

    const closestEntity = world
      .createEntity()
      .addComponent(SimEcsComponent, {
        entity: newWorld.buildEntity()
          .with(new TransformComponent({
            position: Vector2.ZERO,
          }))
          .build(),
      });

    const sorted = [...createRandomEntities(), closestEntity].sort(
      byClosestDistance(targetEntity)
    );

    expect(sorted[0]).toBe(closestEntity);
  });
});

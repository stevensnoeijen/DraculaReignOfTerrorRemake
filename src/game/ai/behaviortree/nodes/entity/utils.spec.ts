import { buildWorld, IWorld } from 'sim-ecs';
import { World } from 'ecsy';

import { TransformComponent } from '../../../../systems/TransformComponent';
import { CreateRandomEntities } from '../../../../__tests__/utils';

import { SimEcsComponent } from './../../../../systems/SimEcsComponent';
import { Vector2 } from './../../../../math/Vector2';
import { constructCreateRandomEntities } from './../../../../__tests__/utils';
import { getEntitiesInRange } from './utils';

import { Alive } from '~/game/components/Alive';
import { Team } from '~/game/components/Team';

describe('getEntitiesInRange', () => {
  let world: World;
  let newWorld: IWorld;
  let createRandomEntities: CreateRandomEntities;

  beforeEach(() => {
    newWorld = buildWorld().build();
    world = new World()
      .registerComponent(TransformComponent)
      .registerComponent(SimEcsComponent);
    createRandomEntities = constructCreateRandomEntities(world);
  });

  it('should success set target when there is an enemy within range', () => {
    const entity = world
      .createEntity()
      .addComponent(TransformComponent, {
        position: new Vector2(0, 0),
      })
      .addComponent(SimEcsComponent, {
        entity: newWorld.buildEntity()
          .with(new Team(1))
          .with(new Alive(true))
          .build(),
      });

    const entities = [
      ...createRandomEntities(10, { x: 5, y: 5 }, { x: 50, y: 50 }),
      entity,
    ];

    const foundEntities = getEntitiesInRange(entity, entities, 100);

    expect(foundEntities.length).toBeGreaterThan(1);
  });
});

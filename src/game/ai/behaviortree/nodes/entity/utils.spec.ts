import { buildWorld, IWorld } from 'sim-ecs';

import { Transform } from '../../../../components/Transform';
import { CreateRandomEntities } from '../../../../__tests__/utils';

import { Vector2 } from './../../../../math/Vector2';
import { constructCreateRandomEntities } from './../../../../__tests__/utils';
import { getEntitiesInRange } from './utils';

import { Alive } from '~/game/components/Alive';
import { Team } from '~/game/components/Team';

describe('getEntitiesInRange', () => {
  let world: IWorld;
  let createRandomEntities: CreateRandomEntities;

  beforeEach(() => {
    world = buildWorld().build();
    createRandomEntities = constructCreateRandomEntities(world);
  });

  it('should success set target when there is an enemy within range', () => {
    const entity = world.buildEntity()
      .with(new Team(1))
      .with(new Alive(true))
      .with(new Transform(Vector2.ZERO))
      .build();

    const entities = [
      ...createRandomEntities(10, { x: 5, y: 5 }, { x: 50, y: 50 }),
      entity,
    ];

    const foundEntities = getEntitiesInRange(entity, entities, 100);

    expect(foundEntities.length).toBeGreaterThan(1);
  });
});

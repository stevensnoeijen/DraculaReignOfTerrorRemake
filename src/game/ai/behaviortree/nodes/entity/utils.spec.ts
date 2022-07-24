import { Vector2 } from './../../../../math/Vector2';
import { constructCreateRandomEntities } from './../../../../__tests__/utils';
import { World } from 'ecsy';
import { TeamComponent } from '../../../../systems/TeamComponent';
import { TransformComponent } from '../../../../systems/TransformComponent';
import { CreateRandomEntities } from '../../../../__tests__/utils';
import { getEntitiesInRange } from './utils';

describe('getEntitiesInRange', () => {
  let world: World;
  let createRandomEntities: CreateRandomEntities;

  beforeEach(() => {
    world = new World()
      .registerComponent(TransformComponent)
      .registerComponent(TeamComponent);
    createRandomEntities = constructCreateRandomEntities(world);
  });

  it('should success set target when there is an enemy within range', () => {
    const entity = world
      .createEntity()
      .addComponent(TransformComponent, {
        position: new Vector2(0, 0),
      })
      .addComponent(TeamComponent, {
        number: 1,
      });

    const entities = [
      ...createRandomEntities(10, { x: 5, y: 5 }, { x: 50, y: 50 }),
      entity,
    ];

    const foundEntities = getEntitiesInRange(entity, entities, 100);

    expect(foundEntities.length).toBeGreaterThan(1);
  });
});

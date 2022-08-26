import { buildWorld } from 'sim-ecs';
import { World } from 'ecsy';

import { SimEcsComponent } from './../SimEcsComponent';
import { AliveComponent } from './../alive/AliveComponent';

import { isOnTeam, isSameEntity, isAlive } from './index';

import { Team } from '~/game/components/Team';

const newWorld = buildWorld().build();
const world = new World()
  .registerComponent(SimEcsComponent)
  .registerComponent(AliveComponent);

describe('isOnTeam', () => {
  it('should return false if entity has no Team', () => {
    const entity = world.createEntity();
    const predicate = isOnTeam(1);

    expect(predicate(entity)).toBe(false);
  });

  it('should return true if entity team is the same', () => {
    const entity = world.createEntity().addComponent(SimEcsComponent, {
      entity: newWorld.buildEntity().with(new Team(1)).build(),
    });
    const predicate = isOnTeam(1);

    expect(predicate(entity)).toBe(true);
  });

  it('should return false if entity team is different', () => {
    const entity = world.createEntity().addComponent(SimEcsComponent, {
      entity: newWorld.buildEntity().with(new Team(2)).build(),
    });
    const predicate = isOnTeam(1);

    expect(predicate(entity)).toBe(false);
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

describe('isAlive', () => {
  it('should return true when component is not set', () => {
    const entity = world.createEntity();

    expect(isAlive()(entity)).toBe(true);
  });

  it('should return true when component is set and true', () => {
    const entity = world.createEntity().addComponent(AliveComponent, {
      alive: true,
    });

    expect(isAlive()(entity)).toBe(true);
  });

  it('should return false when component is set and false', () => {
    const entity = world.createEntity().addComponent(AliveComponent, {
      alive: false,
    });

    expect(isAlive()(entity)).toBe(false);
  });
});

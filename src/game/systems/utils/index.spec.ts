import { buildWorld } from 'sim-ecs';

import { isOnTeam, isSameEntity, isAlive } from './index';

import { Team } from '~/game/components/Team';
import { Alive } from '~/game/components/Alive';

const world = buildWorld().build();

describe('isOnTeam', () => {
  it('should return false if entity has no Team', () => {
    const entity = world.buildEntity()
      .build();
    const predicate = isOnTeam(1);

    expect(predicate(entity)).toBe(false);
  });

  it('should return true if entity team is the same', () => {
    const entity = world.buildEntity()
      .with(new Team(1))
      .build();
    const predicate = isOnTeam(1);

    expect(predicate(entity)).toBe(true);
  });

  it('should return false if entity team is different', () => {
    const entity = world.buildEntity()
      .with(new Team(2))
      .build();
    const predicate = isOnTeam(1);

    expect(predicate(entity)).toBe(false);
  });
});

describe('isSameEntity', () => {
  it('should return false entities are different', () => {
    const a = world.buildEntity()
      .build();
    const b = world.buildEntity()
      .build();

    const predictate = isSameEntity(a);

    expect(predictate(b)).toBe(false);
  });

  it('should return true if given entities are the same', () => {
    const a = world.buildEntity().build();

    const predictate = isSameEntity(a);

    expect(predictate(a)).toBe(true);
  });
});

describe('isAlive', () => {
  it('should return true when component is not set', () => {
    const entity = world.buildEntity()
      .build();

    expect(isAlive(entity)).toBe(false);
  });

  it('should return true when component is set and true', () => {
    const entity = world.buildEntity()
      .with(new Alive(true))
      .build();

    expect(isAlive(entity)).toBe(true);
  });

  it('should return false when component is set and false', () => {
    const entity = world.buildEntity()
      .with(new Alive(false))
      .build();

    expect(isAlive(entity)).toBe(false);
  });
});

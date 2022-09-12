import { buildWorld } from 'sim-ecs';

import { isOnTeam, isAlive, isCollider } from './index';

import { Team } from '~/game/components/Team';
import { Alive } from '~/game/components/Alive';
import { Collider } from '~/game/components';

const world = buildWorld().build();

describe('isOnTeam', () => {
  it('should return false if entity has no Team', () => {
    const entity = world.buildEntity().build();
    const predicate = isOnTeam(Team.PLAYER);

    expect(predicate(entity)).toBe(false);
  });

  it('should return true if entity team is the same', () => {
    const entity = world.buildEntity().with(Team.PLAYER).build();
    const predicate = isOnTeam(Team.PLAYER);

    expect(predicate(entity)).toBe(true);
  });

  it('should return false if entity team is different', () => {
    const entity = world.buildEntity().with(Team.CPU).build();
    const predicate = isOnTeam(Team.PLAYER);

    expect(predicate(entity)).toBe(false);
  });
});

describe('isAlive', () => {
  it('should return true when component is not set', () => {
    const entity = world.buildEntity().build();

    expect(isAlive(entity)).toBe(false);
  });

  it('should return true when component is set and true', () => {
    const entity = world.buildEntity().with(new Alive(true)).build();

    expect(isAlive(entity)).toBe(true);
  });

  it('should return false when component is set and false', () => {
    const entity = world.buildEntity().with(new Alive(false)).build();

    expect(isAlive(entity)).toBe(false);
  });
});

describe('isCollider', () => {
  it(`should return false if entity does not
    have the Collider component`, () => {
    const entity = world.buildEntity().build();

    expect(isCollider(entity)).toBe(false);
  });

  it('should return true if entity has the Collider component', () => {
    const entity = world.buildEntity().with(Collider).build();

    expect(isCollider(entity)).toBe(true);
  });
});

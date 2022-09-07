import { buildWorld } from 'sim-ecs';

import { isOnTeam, isAlive } from './index';

import { Team } from '~/game/components/Team';
import { Alive } from '~/game/components/Alive';


const world = buildWorld().build();

describe('isOnTeam', () => {
  it('should return false if entity has no Team', () => {
    const entity = world.buildEntity()
      .build();
    const predicate = isOnTeam(Team.PLAYER);

    expect(predicate(entity)).toBe(false);
  });

  it('should return true if entity team is the same', () => {
    const entity = world.buildEntity()
      .with(Team.PLAYER)
      .build();
    const predicate = isOnTeam(Team.PLAYER);

    expect(predicate(entity)).toBe(true);
  });

  it('should return false if entity team is different', () => {
    const entity = world.buildEntity()
      .with(Team.CPU)
      .build();
    const predicate = isOnTeam(Team.PLAYER);

    expect(predicate(entity)).toBe(false);
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

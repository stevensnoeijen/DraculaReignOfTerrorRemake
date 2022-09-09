import { buildWorld } from 'sim-ecs';

import { isSameEntity } from './entity';


const world = buildWorld().build();

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

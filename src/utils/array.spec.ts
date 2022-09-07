import { getRandomValue } from './array';

describe('getRandomValue', () => {
  it('should return random value from the array', () => {
    expect(getRandomValue([1, 2, 3])).toBeDefined();
  });
});

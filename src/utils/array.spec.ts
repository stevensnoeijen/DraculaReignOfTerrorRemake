import { getRandomValue } from './array';

describe('getRandomValue', () => {
  it('should return undefined when array is empty', () => {
    expect(getRandomValue([])).toEqual(undefined);
  });

  it('should return random value from the array', () => {
    expect(getRandomValue([1, 2, 3])).toBeDefined();
  });
});

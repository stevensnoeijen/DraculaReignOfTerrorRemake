import { arrayIncludesByEquals, getRandomValue } from './array';

import { returnFalse, returnTrue } from '~/__tests__/utils';

describe('getRandomValue', () => {
  it('should return random value from the array', () => {
    expect(getRandomValue([1, 2, 3])).toBeDefined();
  });
});

describe('arrayIncludesByEquals', () => {
  it('should return false if no item is found by equals', () => {
    const array = Array.from({ length: 3 }, () => ({ equals: returnFalse }));

    expect(arrayIncludesByEquals(array, { equals: returnFalse })).toBe(false);
  });

  it('should return true when item is found by equals', () => {
    const array = Array.from({ length: 3 }, () => ({ equals: returnTrue }));

    expect(arrayIncludesByEquals(array, { equals: returnFalse })).toBe(true);
  });
});

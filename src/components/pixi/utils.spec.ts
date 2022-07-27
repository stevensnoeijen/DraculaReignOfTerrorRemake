import { isAnyPropertySet } from './utils';

describe('isAnyPropertySet', () => {
  it('should return false when empty object is given', () => {
    expect(isAnyPropertySet({})).toBe(false);
  });

  it('should return false when object with undefined value is given', () => {
    expect(
      isAnyPropertySet({
        test: undefined,
      })
    ).toBe(false);
  });

  it('should return true when object with defined value is given', () => {
    expect(
      isAnyPropertySet({
        test: 1,
      })
    ).toBe(true);
  });
});

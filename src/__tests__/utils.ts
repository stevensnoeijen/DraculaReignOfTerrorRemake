export const defineMockGetSetProperty = <T>(
  object: object,
  propertyName: string,
  propertyDefault: T
) => {
  let value = propertyDefault;
  Object.defineProperty(object, propertyName, {
    get: jest.fn(() => value),
    set: jest.fn((newValue: T) => (value = newValue)),
  });
};

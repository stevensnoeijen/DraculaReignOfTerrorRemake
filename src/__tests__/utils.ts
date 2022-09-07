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

export const disableConsoleWarn = () => {
  return jest.spyOn(console, 'warn').mockImplementation(() => {});
};

export const returnTrue = (other: unknown) => true;
export const returnFalse = (other: unknown) => false;

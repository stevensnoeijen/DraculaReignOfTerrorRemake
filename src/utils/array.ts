export const removeNullable = Boolean;

export const getRandomValue = <T>(array: T[]): T | undefined => {
  if (array.length === 0)
    return undefined;

  return array[Math.ceil(Math.random() * array.length) - 1];
};

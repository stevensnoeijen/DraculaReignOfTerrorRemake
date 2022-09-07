import { ArrayMinLength } from './types';

export const removeNullable = Boolean;

export const getRandomValue = <T>(array: ArrayMinLength<T, 1>): T => {
  return array[Math.ceil(Math.random() * array.length) - 1];
};

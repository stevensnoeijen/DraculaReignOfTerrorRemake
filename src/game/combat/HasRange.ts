import { Range } from '../utils/Range';

export interface HasRange {
  readonly range: Range;
}

export const isHasRange = (object: unknown): object is HasRange => {
  return (object as HasRange).range instanceof Range;
};

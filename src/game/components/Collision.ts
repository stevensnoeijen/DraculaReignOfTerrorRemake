import { Size } from '../math/types';

export class Collision {
  constructor(
    /**
     * This is always a rectangle.
     */
    public readonly size: Size
  ) {}
}

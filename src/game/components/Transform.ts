
import { Vector2 } from '../math/Vector2';
import { toGridPosition } from '../utils/grid';

export class Transform {
  constructor(
    public position: Vector2,
    /**
     * in degrees (-180 to 180)
     */
    public rotation: number = 0) {
  }

  public get gridPosition(): Vector2 {
    return toGridPosition(this.position);
  }

  public distance(other: Transform): number {
    return Vector2.distance(this.position, other.position);
  }
}

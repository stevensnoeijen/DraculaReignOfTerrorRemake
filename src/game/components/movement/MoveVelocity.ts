
import { Vector2 } from '../../math/Vector2';

/**
 * Moves entity with velocity and a physics body.
 */
export class MoveVelocity {
  constructor(
    public moveSpeed: number = 100,
    public velocity: Vector2 = Vector2.ZERO
  ) {

  }

  public calculateMovement(delta: number): Vector2 {
    return Vector2.multiplies(this.velocity, this.moveSpeed * (delta / 1000));
  }
}

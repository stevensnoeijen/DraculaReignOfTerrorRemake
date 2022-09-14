import { Vector2 } from '../../math/Vector2';

/**
 * Moves entity with velocity and a physics body.
 */
export class MoveVelocity {
  constructor(
    public moveSpeed: number,
    public velocity: Vector2 = Vector2.ZERO
  ) {}
}

import { Component, Types } from 'ecsy';
import { Vector2 } from '../../math/Vector2';

export interface IMoveTransformVelocityComponentProps {
	moveSpeed?: number;
	velocity?: Vector2;
}

/**
 * Moves entity with velocity.
 * Use {@link MoveVelocityComponent} when physics is required.
 */
export class MoveTransformVelocityComponent extends Component<IMoveTransformVelocityComponentProps> {
	static schema = {
		moveSpeed: { type: Types.Number, default: 100 },
		velocity: { type: Types.Ref, default: Vector2.ZERO },
	};

	moveSpeed!: number;
	velocity!: Vector2;

	public calculateMovement(delta: number): Vector2 {
		return Vector2.multiplies(this.velocity, this.moveSpeed * (delta / 1000));
	}
}

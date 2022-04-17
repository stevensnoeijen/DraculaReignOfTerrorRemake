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
	moveSpeed!: number;
	velocity!: Vector2;
}

MoveTransformVelocityComponent.schema = {
	moveSpeed: { type: Types.Number, default: 100 },
	velocity: { type: Types.Ref, default: Vector2.ZERO },
};

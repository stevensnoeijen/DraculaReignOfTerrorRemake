import { Component, Types } from 'ecsy';
import { Vector2 } from '../math/Vector2';

export interface IMoveVelocityComponentProps {
	moveSpeed?: number;
	velocity?: Vector2;
	body?: Matter.Body | null;
}

/**
 * Moves entity with velocity and a physics body.
 * Use {@link MoveTransformVelocityComponent} when physics is not nesesery.
 */
export class MoveVelocityComponent extends Component<IMoveVelocityComponentProps> {
	moveSpeed!: number;
	velocity!: Vector2;
	body!: Matter.Body | null;
}

MoveVelocityComponent.schema = {
	moveSpeed: { type: Types.Number, default: 100 },
	velocity: { type: Types.Ref, default: Vector2.ZERO },
	body: { type: Types.Ref, default: null },
};

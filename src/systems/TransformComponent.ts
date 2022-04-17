import { Component, Types } from 'ecsy';
import { Vector2 } from '../math/Vector2';

export interface TransformComponentProps {
	position: Vector2;
	rotation?: number;
}

export class TransformComponent extends Component<TransformComponentProps> {
	position!: Vector2;
	/**
	 * in degrees (-180 to 180)
	 */
	rotation!: number;
}

TransformComponent.schema = {
	position: { type: Types.Ref },
	rotation: { type: Types.Number, default: 0 },
};

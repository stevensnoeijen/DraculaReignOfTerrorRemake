import { Component, Types } from 'ecsy';
import { Vector2 } from '../math/Vector2';
import { toGridPosition } from '../utils';

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

	public get gridPosition (): Vector2 {
		return toGridPosition(this.position);
	}
}

TransformComponent.schema = {
	position: { type: Types.Ref },
	rotation: { type: Types.Number, default: 0 },
};
import { Component, Types } from 'ecsy';
import { Vector2 } from '../math/Vector2';

export interface TransformComponentProps {
	position: Vector2;
}

export class TransformComponent extends Component<TransformComponentProps> {
	public position: Vector2;
}

TransformComponent.schema = {
	position: { type: Types.JSON },
};

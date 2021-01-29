import { Component, Types } from 'ecsy';
import { Vector2 } from '../math/Vector2';

export interface PositionComponentProps {
	position: Vector2;
}

export class PositionComponent extends Component<PositionComponentProps> {
	public position: Vector2;
}

PositionComponent.schema = {
	position: { type: Types.JSON },
};

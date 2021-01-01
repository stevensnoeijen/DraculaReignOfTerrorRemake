import { Component, Types } from 'ecsy';

export interface PositionComponentProps {
	x: number;
	y: number;
}

export class PositionComponent extends Component<PositionComponentProps> {
	public x: number;
	public y: number;
}

PositionComponent.schema = {
	x: { type: Types.Number },
	y: { type: Types.Number },
};

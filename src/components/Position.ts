import { Component, Types } from 'ecsy';

export interface PositionOptions {
	x: number;
	y: number;
}

export class Position extends Component<PositionOptions> {
	public x: number;
	public y: number;
}

Position.schema = {
	x: { type: Types.Number },
	y: { type: Types.Number },
};

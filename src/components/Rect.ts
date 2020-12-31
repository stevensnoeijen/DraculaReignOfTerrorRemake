import { Component, Types } from 'ecsy';

export class Rect extends Component<{}> {
	fillStyle?: string;
	lineWidth?: number;
	lineStyle?: string;
}

Rect.schema = {
	fillStyle: { type: Types.String },
	lineWidth: { type: Types.String },
	lineStyle: { type: Types.String },
};

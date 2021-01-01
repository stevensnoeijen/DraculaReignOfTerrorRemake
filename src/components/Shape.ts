import { Component, Types } from 'ecsy';

type Types = 'rectangle';

interface IShapeProps {
	type: Types;
	fillStyle: string;
	lineWidth: number;
	lineStyle: string;
}

export class Shape extends Component<IShapeProps> {
	type: Types;
	fillStyle: string;
	lineWidth: number;
	lineStyle: string;
}

Shape.schema = {
	type: { type: Types.String },
	fillStyle: { type: Types.String },
	lineWidth: { type: Types.String },
	lineStyle: { type: Types.String },
};

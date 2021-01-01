import { Component, Types } from 'ecsy';

type Types = 'rectangle';

interface IShapeComponentProps {
	type: Types;
	fillStyle: string;
	lineWidth: number;
	lineStyle: string;
}

export class ShapeComponent extends Component<IShapeComponentProps> {
	type: Types;
	fillStyle: string;
	lineWidth: number;
	lineStyle: string;
}

ShapeComponent.schema = {
	type: { type: Types.String },
	fillStyle: { type: Types.String },
	lineWidth: { type: Types.String },
	lineStyle: { type: Types.String },
};

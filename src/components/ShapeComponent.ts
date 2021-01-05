import { Component, Types } from 'ecsy';

type Types = 'rectangle';

interface IShapeComponentProps {
	type: Types;
	fillStyle?: string;
	lineWidth?: number;
	lineStyle?: string;
	renderOrigin: 'center' | 'topleft';// TODO: change this..
}

export class ShapeComponent extends Component<IShapeComponentProps> {
	type: Types;
	fillStyle?: string;
	lineWidth?: number;
	lineStyle?: string;
	renderOrigin: 'center' | 'topleft';
}

ShapeComponent.schema = {
	type: { type: Types.String },
	fillStyle: { type: Types.String },
	lineWidth: { type: Types.String },
	lineStyle: { type: Types.String },
	renderOrigin: { type: Types.String, }
};

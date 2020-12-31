import { Component, Types } from 'ecsy';

export interface ITextOptions {
	text: string;
	font: string;
	color: string;
}

export class Text extends Component<ITextOptions> {
	text: string;
	font: string;
	color: string;
}

Text.schema = {
	text: { type: Types.String },
	font: { type: Types.String },
	color: { type: Types.String },
};

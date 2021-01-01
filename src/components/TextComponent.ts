import { Component, Types } from 'ecsy';

export interface ITextComponentProps {
	text: string;
	font: string;
	color: string;
}

export class TextComponent extends Component<ITextComponentProps> {
	text: string;
	font: string;
	color: string;
}

TextComponent.schema = {
	text: { type: Types.String },
	font: { type: Types.String },
	color: { type: Types.String },
};

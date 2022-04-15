import { Component, Types } from 'ecsy';
import { Text } from '../graphics/Text';

export interface ITextComponentProps {
	text: Text;
}

export class TextComponent extends Component<ITextComponentProps> {
	declare text: Text;
}

TextComponent.schema = {
	text: { type: Types.JSON },
};

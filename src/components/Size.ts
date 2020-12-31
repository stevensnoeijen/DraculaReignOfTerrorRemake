import { Component, Types } from 'ecsy';

export class Size extends Component<{}> {
	width: number;
	height: number;
}

Size.schema = {
	width: { type: Types.Number },
	height: { type: Types.Number },
};

import { Component, Types } from 'ecsy';

export interface ISelectableComponentProps {
	selected?: boolean;
}

export class SelectableComponent extends Component<ISelectableComponentProps> {
	static schema = {
		selected: { type: Types.Boolean, default: false },
	};	

	declare selected: boolean;
}
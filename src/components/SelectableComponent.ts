import { Component, Types } from 'ecsy';

export interface ISelectableComponentProps {
	selected?: boolean;
}

export class SelectableComponent extends Component<ISelectableComponentProps> {
	selected: boolean;
}

SelectableComponent.schema = {
	selected: { type: Types.Boolean, default: false },
};

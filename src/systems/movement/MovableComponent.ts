import { Component, Types } from 'ecsy';

type MovableComponentProps = {
	moving: boolean;
};

export class MovableComponent extends Component<MovableComponentProps> {
	declare moving: boolean;
}

MovableComponent.schema = {
	moving: { type: Types.Boolean, default: false },
};

import { Component, Types } from 'ecsy';

import { Vector2 } from '../../math/Vector2';

export interface IMovePositionDirectComponentProps {
	movePosition: Vector2 | null;
}

export class MovePositionDirectComponent extends Component<IMovePositionDirectComponentProps> {
	movePosition!: Vector2 | null;
}

MovePositionDirectComponent.schema = {
	movePosition: { type: Types.Ref, default: null, },
};

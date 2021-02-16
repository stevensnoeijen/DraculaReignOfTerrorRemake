import { Component, Types } from 'ecsy';
import { Vector2 } from '../math/Vector2';

export interface IMoveTransformVelocityComponentProps {
    moveSpeed: number;
    velocityVector?: Vector2;
}

export class MoveTransformVelocityComponent extends Component<IMoveTransformVelocityComponentProps> {
    moveSpeed!: number;
    velocityVector!: Vector2;
}

MoveTransformVelocityComponent.schema = {
    moveSpeed: { type: Types.Number, default: 100 },
    velocityVector: { type: Types.JSON, default: Vector2.ZERO },
};

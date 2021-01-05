import { Component, Types } from 'ecsy';

export interface RotationComponentProps {
    rotation: number;
}

export class RotationComponent extends Component<RotationComponentProps> {
    /**
     * in degrees (360)
     */
    public rotation: number;
}

RotationComponent.schema = {
    rotation: { type: Types.Number, default: 0 },
};

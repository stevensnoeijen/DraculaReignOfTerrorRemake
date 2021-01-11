import { Component, Types } from 'ecsy';

export interface IColliderComponentProps {
    width: number;
    height: number;
}

// for now only a rect
export class ColliderComponent extends Component<IColliderComponentProps> {
    width: number;
    height: number;
}

ColliderComponent.schema = {
    width: { type: Types.Number },
    height: { type: Types.Number },
};

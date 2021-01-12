import { Component, Types } from 'ecsy';

export interface IAliveComponentProps {
    alive?: boolean;
}

export class AliveComponent extends Component<IAliveComponentProps> {
    alive: boolean
}

AliveComponent.schema = {
    alive: { type: Types.Boolean, default: true },
};

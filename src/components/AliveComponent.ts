import { Component, Types } from 'ecsy';

type AliveStatus = 'alive' | 'dying' | 'dead';

export interface IAliveComponentProps {
    status?: AliveStatus;
}

export class AliveComponent extends Component<IAliveComponentProps> {
    status: AliveStatus
}

AliveComponent.schema = {
    status: { type: Types.String, default: 'alive' },
};

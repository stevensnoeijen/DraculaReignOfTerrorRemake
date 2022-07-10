import { Component, Types } from 'ecsy';

export interface IAliveComponentProps {
    alive?: boolean;
}

export class AliveComponent extends Component<IAliveComponentProps> {
    static schema = {
        alive: { type: Types.Boolean, default: true },
    };    

    declare alive: boolean
}
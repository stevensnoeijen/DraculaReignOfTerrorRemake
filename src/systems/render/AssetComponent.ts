import { Component, Types } from 'ecsy';

import { Animations } from './../../animations';

export interface AssetComponentProps {
    animations: Animations;
}

export class AssetComponent extends Component<AssetComponentProps> {
    static schema = {
        animations: { type: Types.Ref },
    };   

    animations!: Animations;
}
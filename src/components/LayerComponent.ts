import { Component, Types } from 'ecsy';

export interface ILayerComponentProps {
	layer: number;
}

export class LayerComponent extends Component<ILayerComponentProps> {
	declare layer: number;
}

LayerComponent.schema = {
	layer: { type: Types.Number, default: 10 },
};

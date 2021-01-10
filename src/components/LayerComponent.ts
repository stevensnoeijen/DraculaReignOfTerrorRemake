import { Component, Types } from 'ecsy';

export interface ILayerComponentProps {
	layer: number;
}

export class LayerComponent extends Component<ILayerComponentProps> {
	layer: number;
}

LayerComponent.schema = {
	layer: { type: Types.Number, default: 10 },
};

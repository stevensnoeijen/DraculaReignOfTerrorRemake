import { Component, Types, Entity } from 'ecsy';

export interface ILayerComponentProps {
	layer: number;
}

export class LayerComponent extends Component<ILayerComponentProps> {
	layer: number;

	static compare(a: Entity, b: Entity): number {
		const aLayered = a.getComponent(LayerComponent);
		const bLayered = b.getComponent(LayerComponent);
		if (!aLayered || !bLayered) {
			return 0;
		}

		return aLayered.layer - bLayered.layer;
	}
}

LayerComponent.schema = {
	layer: { type: Types.Number, default: 10 },
};

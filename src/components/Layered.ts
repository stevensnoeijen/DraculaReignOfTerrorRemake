import { Component, Types, Entity } from 'ecsy';

export interface ILayeredOptions {
	layer: number;
}

export class Layered extends Component<ILayeredOptions> {
	layer: number;

	static compare(a: Entity, b: Entity): number {
		const aLayered = a.getComponent(Layered);
		const bLayered = b.getComponent(Layered);
		if (!aLayered || !bLayered) {
			return 0;
		}

		return aLayered.layer - bLayered.layer;
	}
}

Layered.schema = {
	layer: { type: Types.Number, default: 10 },
};

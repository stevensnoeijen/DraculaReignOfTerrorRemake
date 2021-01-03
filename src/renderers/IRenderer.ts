import { Entity } from 'ecsy';

export interface IRenderer {
	render(entity: Entity): void;
}

import { System, World, Attributes } from 'ecsy';

import { SpriteComponent } from '../components/SpriteComponent';

export class RenderSystem extends System {
	public static queries = {
		renderables: {
			components: [SpriteComponent]
		},
	};

	constructor(world: World, attributes: Attributes) {
		super(world, attributes);
	}

	// This method will get called on every frame by default
	public execute(delta: number, time: number): void {
		
	}
}

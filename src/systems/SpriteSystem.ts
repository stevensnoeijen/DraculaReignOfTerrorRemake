import { Attributes, System, World } from "ecsy";
import * as PIXI from 'pixi.js';

import { SpriteComponent } from './../components/SpriteComponent';

export class SpriteSystem extends System {
	public static queries = {
		sprites: { components: [SpriteComponent] },
	};

	private readonly app: PIXI.Application; 

	constructor(world: World, attributes: Attributes) {
        super(world, attributes);
        this.app = attributes.app;
	}

	// This method will get called on every frame by default
	public execute(delta: number, time: number): void {
		if ((this.queries.sprites.results?.length ?? 0) > 0) {
			for (const entity of this.queries.sprites.results) {
				const component = entity.getMutableComponent(SpriteComponent)!;

				if (!component.addedToStage) {
					this.app.stage.addChild(component.sprite);

					component.addedToStage = true;
				}
			}
			if (this.queries.sprites.results.length) {

				
			}
		}
	}
}

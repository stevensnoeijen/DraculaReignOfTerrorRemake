import { Attributes, System, World } from "ecsy";
import * as PIXI from 'pixi.js';

import { HealthComponent } from './../components/HealthComponent';
import { getHealthColor } from './health/utils';
import { SpriteComponent } from './../components/SpriteComponent';
import { GraphicsComponent } from '../components/GraphicsComponent';

export class GraphicsSystem extends System {
	public static queries = {
		graphics: { components: [GraphicsComponent] },
	};

	private readonly app: PIXI.Application; 

	constructor(world: World, attributes: Attributes) {
        super(world, attributes);
        this.app = attributes.app;
	}

	// This method will get called on every frame by default
	public execute(delta: number, time: number): void {
		if ((this.queries.graphics.results?.length ?? 0) > 0) {
			for (const entity of this.queries.graphics.results) {
				const component = entity.getMutableComponent(GraphicsComponent) as GraphicsComponent;

				if (!component.addedToStage) {
					this.app.stage.addChild(component.graphics);

					component.addedToStage = true;
				}

				if (entity.hasComponent(SpriteComponent)) {
					const sprite = entity.getComponent(SpriteComponent)!.sprite;

					// healthbar
					component.graphics.clear();
					component.graphics.beginFill(0x000000);
					component.graphics.drawRect(sprite.position.x - 8, sprite.position.y + 10, 16, 5);
					component.graphics.endFill();

					const health = entity.getComponent(HealthComponent);
					if(health){
						const percentage = health.points / health.maxPoints;
						component.graphics.beginFill(getHealthColor(percentage));
						component.graphics.drawRect(sprite.position.x - 7, sprite.position.y + 11, 14 * percentage, 3);
						component.graphics.endFill();
					}
				}
			}
		}
	}
}

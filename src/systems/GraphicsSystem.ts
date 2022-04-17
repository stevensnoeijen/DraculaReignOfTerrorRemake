import { SizeComponent } from './../components/SizeComponent';
import { EntityHelper } from '../EntityHelper';
import { Attributes, Entity, System, World } from "ecsy";
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

	private drawHealthBar(entity: Entity, graphics: PIXI.Graphics, sprite: PIXI.Sprite): void {
		graphics.beginFill(0x000000);
		graphics.drawRect(-8, 12, 16, 5);
		graphics.endFill();

		const health = entity.getComponent(HealthComponent);
		if(health){
			const percentage = health.points / health.maxPoints;
			graphics.beginFill(getHealthColor(percentage));
			graphics.drawRect(-7, 13, 14 * percentage, 3);
			graphics.endFill();
		}
	}

	private drawSelectionIndicators(entity: Entity, graphics: PIXI.Graphics, sprite: PIXI.Sprite): void {
		const size = entity.getComponent(SizeComponent)!;

		const offset = 2;
		const left = -size.width / 2 - offset;
		const top = -size.height / 2 - offset;
		const right = size.width / 2 + offset;

		graphics.lineStyle(1, 0x000000)
			.moveTo(left, -4)
       		.lineTo(left, top)
			.lineTo(left / 2, top);

		graphics.lineStyle(1, 0x000000)
			.moveTo(right / 2, top)
			.lineTo(right, top)
			.lineTo(right, -4);
	}

	public execute(delta: number, time: number): void {
		if ((this.queries.graphics.results?.length ?? 0) > 0) {
			for (const entity of this.queries.graphics.results) {
				const component = entity.getMutableComponent(GraphicsComponent) as GraphicsComponent;

				if (!component.addedToStage) {
					this.app.stage.addChild(component.graphics);

					component.addedToStage = true;
				}

				if (entity.hasComponent(SpriteComponent) && EntityHelper.isSelected(entity)) {
					const sprite = entity.getComponent(SpriteComponent)!.sprite;

					component.graphics.clear();
					component.graphics.position.set(sprite.position.x, sprite.position.y);

					this.drawSelectionIndicators(entity, component.graphics, sprite);
					this.drawHealthBar(entity, component.graphics, sprite);
				} else {
					component.graphics.clear();
				}
			}
		}
	}
}

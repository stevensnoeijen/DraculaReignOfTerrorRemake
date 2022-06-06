import { TransformComponent } from './../../TransformComponent';
import { PixiJsSystem } from "../../PixiJsSystem";
import { SpriteComponent } from './SpriteComponent';

export class SpriteSystem extends PixiJsSystem {
	public static queries = {
		sprites: {
			components: [SpriteComponent],
			listen: {
				added: true
			}
		},
	};

	// This method will get called on every frame by default
	public execute(delta: number, time: number): void {
		if ((this.queries.sprites.added?.length ?? 0) > 0) {
			for (const entity of this.queries.sprites.added!) {
				const component = entity.getMutableComponent(SpriteComponent)!;
				
				this.app.stage.addChild(component.sprite);

				const transformComponent = entity.getComponent(TransformComponent);
				if (transformComponent != null) {
					component.sprite.position.set(transformComponent.position.x, transformComponent.position.y);
				}
			}
		}
	}
}

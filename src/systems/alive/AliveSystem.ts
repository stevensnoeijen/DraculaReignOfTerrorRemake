import { SpriteComponent } from './../render/sprite/SpriteComponent';
import { System, SystemQueries, Entity } from 'ecsy';

import { AliveComponent } from './AliveComponent';
import { HealthComponent } from '../health/HealthComponent';
import { SelectableComponent } from '../selection/SelectableComponent';
import { PixiJsSystem } from '../PixiJsSystem';

export class AliveSystem extends PixiJsSystem {
	public static queries: SystemQueries = {
		alives: {
			components: [AliveComponent],
			listen: {
				changed: true,
			}
		},
	};

	public execute(delta: number, time: number): void {
		if (this.queries.alives.changed) {
			this.queries.alives.changed.forEach((entity) => {
				if (this.isDead(entity)) {
					this.handleDead(entity);
				}
			});
		}
	}

	private isDead(entity: Entity): boolean {
		const alive = entity.getMutableComponent(AliveComponent);
		if (!alive) {
			return false;
		}

		return !alive.alive;
	}

	private handleDead(entity: Entity): void {
		entity.removeComponent(SelectableComponent);
		entity.removeComponent(HealthComponent);

		const spriteComponent = entity.getComponent(SpriteComponent);
		if (spriteComponent != null) {
			spriteComponent.sprite.texture = this.app.loader.resources.dead.texture!;
		}
	}
}

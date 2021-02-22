import { System, SystemQueries, Entity } from 'ecsy';
import { AliveComponent } from '../components/AliveComponent';
import { HealthComponent } from '../components/HealthComponent';
import { LayerComponent } from '../components/LayerComponent';
import { SelectableComponent } from '../components/SelectableComponent';
import { Constants } from '../Constants';

export class AliveSystem extends System {
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
		const layerComponent = entity.getMutableComponent(LayerComponent);
		if (layerComponent) {
			layerComponent.layer = Constants.LAYER_DEAD;
		}
	}
}

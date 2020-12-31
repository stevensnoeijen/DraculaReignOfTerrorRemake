import { System } from 'ecsy';
import { Tweenable } from '../components/Tweenable';

export class TweenSystem extends System {
	// Define a query of entities that have "Velocity" and "Position" components
	public static queries = {
		tweenable: {
			components: [Tweenable],
		},
	};

	public execute(delta: number, time: number): void {
		for (const entity of this.queries.tweenable.results) {
			const tweenable = entity.getComponent(Tweenable);
			if (tweenable && tweenable.tween) {
				tweenable.tween.update(delta);
			}
		}
	}
}

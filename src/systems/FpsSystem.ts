import { Text } from './../components/Text';
import { Fps } from './../components/Fps';
import { System } from 'ecsy';

export class FpsSystem extends System {
	// Define a query of entities that have "Velocity" and "Position" components
	public static queries = {
		fps: {
			components: [Fps],
		},
	};
	private static readonly UPDATE_TIME = 10000;

	private update = 1000;

	public execute(delta: number, time: number): void {
		this.update += time;
		if (this.update > FpsSystem.UPDATE_TIME) {
			// Iterate through all the entities on the query
			this.queries.fps.results.forEach((entity) => {
				const text = entity.getMutableComponent(Text);
				if (text) {
					text.text = '' + Math.round(delta);
				}
			});
			this.update = 0;
		}
	}
}

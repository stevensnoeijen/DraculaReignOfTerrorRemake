import { TextComponent } from '../components/TextComponent';
import { System } from 'ecsy';
import { FpsComponent } from '../components/FpsComponent';

export class FpsSystem extends System {
	// Define a query of entities that have "Velocity" and "Position" components
	public static queries = {
		fps: {
			components: [FpsComponent],
		},
	};
	private static readonly UPDATE_TIME = 1000;

	private update = 1000;

	public execute(delta: number, time: number): void {
		this.update += delta;
		if (this.update > FpsSystem.UPDATE_TIME) {
			// Iterate through all the entities on the query
			this.queries.fps.results.forEach((entity) => {
				const text = entity.getMutableComponent(TextComponent);
				if (text) {
					text.text = '' + Math.round(delta);
				}
			});
			this.update = 0;
		}
	}
}

import { Constants } from '../Constants';
import { System, World, Attributes, Entity } from 'ecsy';
import { RenderComponent } from '../components/RenderComponent';
import { LayerComponentComparator } from '../helpers/LayerComponentComparator';
import { EntityRenderer } from '../graphics/renderers/EntityRenderer';

export class RenderSystem extends System {
	public static queries = {
		renderables: { components: [RenderComponent] },
	};

	private readonly canvas: HTMLCanvasElement;
	private readonly context: CanvasRenderingContext2D;
	private readonly entityRenderer: EntityRenderer;

	constructor(world: World, attributes: Attributes) {
		super(world, attributes);

		this.canvas = attributes.canvas;
		this.context = this.canvas.getContext('2d')!;

		this.entityRenderer = new EntityRenderer(this.context);
	}

	// This method will get called on every frame by default
	public execute(delta: number, time: number): void {
		// clear canvas
		this.context.clearRect(0, 0, Constants.GAME_WIDTH, Constants.GAME_HEIGHT);

		const renderables = this.queries.renderables.results.sort(
			LayerComponentComparator.compare
		);

		// Iterate through all the entities on the query
		renderables.forEach((entity: Entity) => {
			this.entityRenderer.render(entity);
		});
	}
}

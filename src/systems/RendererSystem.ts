import { TextComponent } from '../components/TextComponent';
import { Constants } from './../Constants';
import { System, World, Attributes, Entity } from 'ecsy';
import { RenderComponent } from '../components/RenderComponent';
import { ShapeComponent } from '../components/ShapeComponent';
import { LayerComponent } from '../components/LayerComponent';
import { ShapeRenderer } from '../renderers/ShapeRenderer';
import { TextRenderer } from '../renderers/TextRenderer';
import { IRenderer } from '../renderers/IRenderer';

export class RendererSystem extends System {
	public static queries = {
		renderables: { components: [RenderComponent] },
	};

	private canvas: HTMLCanvasElement;
	private context: CanvasRenderingContext2D;
	private renderers: { [component: string]: IRenderer | undefined } = {};

	constructor(world: World, attributes: Attributes) {
		super(world, attributes);

		this.canvas = attributes.canvas;
		this.context = this.canvas.getContext('2d')!;

		this.renderers[ShapeComponent.name] = new ShapeRenderer(this.context);
		this.renderers[TextComponent.name] = new TextRenderer(this.context);
	}

	// This method will get called on every frame by default
	public execute(delta: number, time: number): void {
		// clear canvas
		this.context.clearRect(0, 0, Constants.GAME_WIDTH, Constants.GAME_HEIGHT);

		this.context.canvas.removeEventListener;

		const renderables = this.queries.renderables.results.sort(LayerComponent.compare);

		// Iterate through all the entities on the query
		renderables.forEach((entity: Entity) => {
			if (entity.hasComponent(ShapeComponent)) {
				this.renderers[ShapeComponent.name]?.render(entity);
			}
			if (entity.hasComponent(TextComponent)) {
				this.renderers[TextComponent.name]?.render(entity);
			}
		});
	}
}

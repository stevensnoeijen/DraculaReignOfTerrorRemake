import { TextComponent } from '../components/TextComponent';
import { Constants } from '../Constants';
import { System, World, Attributes, Entity, Component } from 'ecsy';
import { RenderComponent } from '../components/RenderComponent';
import { ShapeComponent } from '../components/ShapeComponent';
import { ShapeRenderer } from '../renderers/ShapeRenderer';
import { TextRenderer } from '../renderers/TextRenderer';
import { IRenderer } from '../renderers/IRenderer';
import { VisibilityComponent } from '../components/VisibilityComponent';
import { SelectableComponent } from '../components/SelectableComponent';
import { SelectionRenderer } from '../renderers/SelectionRenderer';
import { HealthComponent } from '../components/HealthComponent';
import { HealthRenderer } from '../renderers/HealthRenderer';
import { LayerComponentComparator } from '../helpers/LayerComponentComparator';

type ComponentRenderer = {
	component: typeof Component;
	renderer: IRenderer;
};

export class RenderSystem extends System {
	public static queries = {
		renderables: { components: [RenderComponent] },
	};

	private readonly canvas: HTMLCanvasElement;
	private readonly context: CanvasRenderingContext2D;
	private readonly componentRenderers: ComponentRenderer[] = [];

	constructor(world: World, attributes: Attributes) {
		super(world, attributes);

		this.canvas = attributes.canvas;
		this.context = this.canvas.getContext('2d')!;

		// define renderers by component type
		this.componentRenderers.push({
			component: ShapeComponent,
			renderer: new ShapeRenderer(this.context),
		});
		this.componentRenderers.push({
			component: SelectableComponent,
			renderer: new SelectionRenderer(this.context),
		});
		this.componentRenderers.push({
			component: HealthComponent,
			renderer: new HealthRenderer(this.context),
		});
		this.componentRenderers.push({
			component: TextComponent,
			renderer: new TextRenderer(this.context),
		});
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
			const visibility = entity.getComponent(VisibilityComponent);
			if (visibility && false === visibility.visible) {
				return;
			}

			const renderers = this.getRenderersByEntityComponents(entity);
			if (renderers.length > 0) {
				renderers.forEach((renderer) => renderer.render(entity));
			}
		});
	}

	private getRenderersByEntityComponents(entity: Entity): IRenderer[] {
		const componentRenderers = this.componentRenderers.filter(
			(componentRenderer) => entity.hasComponent(componentRenderer.component)
		);

		return componentRenderers.map((componentRenderer) => componentRenderer.renderer);
	}
}

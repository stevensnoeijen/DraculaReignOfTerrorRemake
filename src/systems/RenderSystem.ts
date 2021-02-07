import { TextComponent } from '../components/TextComponent';
import { Constants } from '../Constants';
import { System, World, Attributes, Entity, Component } from 'ecsy';
import { RenderComponent } from '../components/RenderComponent';
import { ShapeComponent } from '../components/ShapeComponent';
import { ShapeComponentRenderer } from '../graphics/renderers/component/ShapeComponentRenderer';
import { TextComponentRenderer } from '../graphics/renderers/component/TextComponentRenderer';
import { VisibilityComponent } from '../components/VisibilityComponent';
import { SelectableComponent } from '../components/SelectableComponent';
import { SelectionComponentRenderer } from '../graphics/renderers/component/SelectionComponentRenderer';
import { HealthComponent } from '../components/HealthComponent';
import { HealthComponentRenderer } from '../graphics/renderers/component/HealthComponentRenderer';
import { LayerComponentComparator } from '../helpers/LayerComponentComparator';
import { DebugComponent } from '../components/DebugComponent';
import { DebugComponentRenderer } from '../graphics/renderers/component/DebugComponentRenderer';
import { GridViewComponentRenderer } from '../graphics/renderers/component/GridViewComponentRenderer';
import { GridViewComponent } from '../components/GridViewComponent';
import { IEntityRenderer } from '../graphics/renderers/IEntityRenderer';

type ComponentRenderer = {
	component: typeof Component;
	renderer: IEntityRenderer;
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
			renderer: new ShapeComponentRenderer(this.context),
		});
		this.componentRenderers.push({
			component: SelectableComponent,
			renderer: new SelectionComponentRenderer(this.context),
		});
		this.componentRenderers.push({
			component: HealthComponent,
			renderer: new HealthComponentRenderer(this.context),
		});
		this.componentRenderers.push({
			component: TextComponent,
			renderer: new TextComponentRenderer(this.context),
		});
		this.componentRenderers.push({
			component: DebugComponent,
			renderer: new DebugComponentRenderer(this.context),
		});
		this.componentRenderers.push({
			component: GridViewComponent,
			renderer: new GridViewComponentRenderer(this.context),
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
			if (renderers.length === 0) {
				console.warn(`no renderer found for entity #${entity.id}, removing RenderComponent`);
				entity.removeComponent(RenderComponent);
				return;
			}
			renderers.forEach((renderer) => renderer.render(entity));
		});
	}

	private getRenderersByEntityComponents(entity: Entity): IEntityRenderer[] {
		const componentRenderers = this.componentRenderers.filter(
			(componentRenderer) => entity.hasComponent(componentRenderer.component)
		);

		return componentRenderers.map((componentRenderer) => componentRenderer.renderer);
	}
}

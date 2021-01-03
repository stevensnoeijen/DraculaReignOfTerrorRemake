import { TextComponent } from '../components/TextComponent';
import { Constants } from '../Constants';
import { System, World, Attributes, Entity, Component } from 'ecsy';
import { RenderComponent } from '../components/RenderComponent';
import { ShapeComponent } from '../components/ShapeComponent';
import { LayerComponent } from '../components/LayerComponent';
import { ShapeRenderer } from '../renderers/ShapeRenderer';
import { TextRenderer } from '../renderers/TextRenderer';
import { IRenderer } from '../renderers/IRenderer';
import { VisibilityComponent } from '../components/VisibilityComponent';

export class RenderSystem extends System {
	public static queries = {
		renderables: { components: [RenderComponent] },
	};

	private canvas: HTMLCanvasElement;
	private context: CanvasRenderingContext2D;
	private componentRenderers: {
		component: typeof Component;
		renderer: IRenderer;
	}[] = [];

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
			component: TextComponent,
			renderer: new TextRenderer(this.context),
		});
	}

	// This method will get called on every frame by default
	public execute(delta: number, time: number): void {
		// clear canvas
		this.context.clearRect(0, 0, Constants.GAME_WIDTH, Constants.GAME_HEIGHT);

		const renderables = this.queries.renderables.results.sort(
			LayerComponent.compare
		);

		// Iterate through all the entities on the query
		renderables.forEach((entity: Entity) => {
			const visibility = entity.getComponent(VisibilityComponent);
			if (visibility && false === visibility.visible) {
				return;
			}

			const renderer = this.getRenderer(entity);
			if (renderer) {
				renderer.render(entity);
			}
		});
	}

	private getRenderer(entity: Entity): IRenderer | null {
		const componentRenderer = this.componentRenderers.find(
			(componentRenderer) => entity.hasComponent(componentRenderer.component)
		);

		if (componentRenderer) {
			return componentRenderer.renderer;
		} else {
			return null;
		}
	}
}

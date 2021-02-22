import { Constants } from '../Constants';
import { System, World, Attributes, Entity } from 'ecsy';
import { RenderComponent } from '../components/RenderComponent';
import { LayerComponentComparator } from '../helpers/LayerComponentComparator';
import { EntityRenderer, ComponentType } from '../graphics/renderers/EntityRenderer';
import { ShapeComponent } from '../components/ShapeComponent';
import { HealthComponent } from '../components/HealthComponent';
import { SelectableComponent } from '../components/SelectableComponent';
import { DebugComponent } from '../components/DebugComponent';
import { TextComponent } from '../components/TextComponent';
import { AliveComponent } from '../components/AliveComponent';

export class RenderSystem extends System {
	public static queries = {
		renderables: { components: [RenderComponent] },
	};

	private static readonly RENDER_ORDER: ComponentType[] = [
		DebugComponent,
		ShapeComponent,
		HealthComponent,
		SelectableComponent,
		TextComponent
	];

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

		const renderables = this.queries.renderables.results.sort(this.compareEntity);

		// Iterate through all the entities on the query
		for (const componentType of RenderSystem.RENDER_ORDER) {
			renderables.forEach((entity: Entity) => this.entityRenderer.render(entity, componentType));
		}
	}

	private compareEntity(a: Entity, b: Entity): number {
		const aAliveComponent = a.getComponent(AliveComponent);
		const bAliveComponent = b.getComponent(AliveComponent);
		if (aAliveComponent && bAliveComponent) {
			if (!aAliveComponent.alive && bAliveComponent.alive) {
				return -1;
			} else if (aAliveComponent.alive && !bAliveComponent.alive) {
				return 1;
			} else if (!aAliveComponent.alive && !bAliveComponent.alive) {
				return 0;
			}
		}

		return LayerComponentComparator.compare(a, b);
	}
}

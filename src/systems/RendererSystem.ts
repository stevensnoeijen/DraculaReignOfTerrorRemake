import { TextComponent } from '../components/TextComponent';
import { Constants } from './../Constants';
import { SizeComponent } from '../components/SizeComponent';
import { PositionComponent } from '../components/PositionComponent';
import { System, World, Attributes, Entity } from 'ecsy';
import { RenderComponent } from '../components/RenderComponent';
import { ShapeComponent } from '../components/ShapeComponent';
import { LayerComponent } from '../components/LayerComponent';

export class RendererSystem extends System {
	public static queries = {
		renderables: { components: [RenderComponent, PositionComponent] },
	};

	private canvas: HTMLCanvasElement;
	private context: CanvasRenderingContext2D;

	constructor(world: World, attributes: Attributes) {
		super(world, attributes);

		this.canvas = attributes.canvas;
		this.context = this.canvas.getContext('2d')!;
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
				const shape = entity.getComponent(ShapeComponent);
				if (undefined === shape) {
					return; // skip
				}

				if (shape.type === 'rectangle') {
					this.drawRect(entity);
				}
			}
			if (entity.hasComponent(TextComponent)) {
				this.renderText(entity);
			}
		});
	}

	private drawRect(entity: Entity): void {
		const shape = entity.getComponent(ShapeComponent)!;
		const position = entity.getComponent(PositionComponent)!;
		const size = entity.getComponent(SizeComponent)!;

		this.context.beginPath();

		this.context.rect(position.x, position.y, size.width, size.height);
		if (shape.fillStyle) {
			this.context.fillStyle = shape.fillStyle;
			this.context.fill();
		}

		if (shape.lineWidth && shape.lineWidth > 0) {
			this.context.lineWidth = shape.lineWidth;
			this.context.strokeStyle = shape.lineStyle || '#000';
			this.context.stroke();
		}
	}

	private renderText(entity: Entity): void {
		const text = entity.getComponent(TextComponent)!;
		const position = entity.getComponent(PositionComponent)!;

		this.context.font = text.font;
		this.context.fillStyle = text.color;
		this.context.fillText(text.text, position.x, position.y);
	}
}

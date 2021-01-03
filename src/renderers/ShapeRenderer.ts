import { Entity } from 'ecsy';
import { PositionComponent } from '../components/PositionComponent';
import { ShapeComponent } from '../components/ShapeComponent';
import { SizeComponent } from '../components/SizeComponent';
import { IRenderer } from './IRenderer';

export class ShapeRenderer implements IRenderer {
	constructor(private readonly context: CanvasRenderingContext2D) {}

	public render(entity: Entity): void {
		const shape = entity.getComponent(ShapeComponent);
		if (undefined === shape) {
			return; // skip
		}

		if (shape.type === 'rectangle') {
			const position = entity.getComponent(PositionComponent)!;
			const size = entity.getComponent(SizeComponent)!;

			this.renderRectangle(shape, position, size);
		}
	}

	private renderRectangle(
		shape: ShapeComponent,
		position: PositionComponent,
		size: SizeComponent
	): void {
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
}

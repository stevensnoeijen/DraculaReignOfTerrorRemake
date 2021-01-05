import { Entity } from 'ecsy';
import { PositionComponent } from '../components/PositionComponent';
import { RotationComponent } from '../components/RotationComponent';
import { ShapeComponent } from '../components/ShapeComponent';
import { SizeComponent } from '../components/SizeComponent';
import { IRenderer } from './IRenderer';

export class ShapeRenderer implements IRenderer {
	constructor(private readonly context: CanvasRenderingContext2D) { }

	public render(entity: Entity): void {
		const shape = entity.getComponent(ShapeComponent);
		if (undefined === shape) {
			return; // skip
		}

		if (shape.type === 'rectangle') {
			const position = entity.getComponent(PositionComponent)!;
			const size = entity.getComponent(SizeComponent)!;
			const rotation = entity.getComponent(RotationComponent);

			this.renderRectangle(shape, position, size, rotation);
		}
	}

	private renderRectangle(
		shape: ShapeComponent,
		position: PositionComponent,
		size: SizeComponent,
		rotation?: RotationComponent
	): void {
		this.context.beginPath();

		this.context.translate(position.x, position.y);
		if (rotation) {
			this.context.rotate(rotation.rotation * Math.PI / 180);
		}

		this.context.beginPath();
		this.context.rect(0, 0, size.width, size.height);
		if (shape.fillStyle) {
			this.context.fillStyle = shape.fillStyle;
			this.context.fill();
		}

		if (shape.lineWidth && shape.lineWidth > 0) {
			this.context.lineWidth = shape.lineWidth;
			this.context.strokeStyle = shape.lineStyle || '#000';
			this.context.stroke();
		}

		if (rotation) {
			this.context.rotate(0 * Math.PI / 180);// reset rotate
		}
		this.context.setTransform(1, 0, 0, 1, 0, 0);// reset transform
	}
}

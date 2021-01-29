import { Entity } from 'ecsy';
import { TransformComponent } from '../../components/TransformComponent';
import { ShapeComponent } from '../../components/ShapeComponent';
import { SizeComponent } from '../../components/SizeComponent';
import { IRenderer } from './IRenderer';

export class ShapeRenderer implements IRenderer {
	constructor(private readonly context: CanvasRenderingContext2D) { }

	public render(entity: Entity): void {
		const shape = entity.getComponent(ShapeComponent);
		if (undefined === shape) {
			return; // skip
		}

		if (shape.type === 'rectangle') {
			const transform = entity.getComponent(TransformComponent)!;
			const size = entity.getComponent(SizeComponent)!;

			this.renderRectangle(shape, transform, size);
		}
	}

	private renderRectangle(
		shape: ShapeComponent,
		transform: TransformComponent,
		size: SizeComponent
	): void {
		this.context.beginPath();

		this.context.translate(transform.position.x, transform.position.y);

		if (transform.rotation !== 0) {
			this.context.rotate(transform.rotation * Math.PI / 180);
		}

		const x = shape.renderOrigin === 'topleft' ? 0 : -(size.width / 2);
		const y = shape.renderOrigin === 'topleft' ? 0 : -(size.height / 2);

		this.context.beginPath();
		this.context.rect(x, y, size.width, size.height);
		if (shape.fillStyle) {
			this.context.fillStyle = shape.fillStyle;
			this.context.fill();
		}

		if (shape.lineWidth && shape.lineWidth > 0) {
			this.context.lineWidth = shape.lineWidth;
			this.context.strokeStyle = shape.lineStyle || '#000';
			this.context.stroke();
		}

		// render center dot
		this.context.fillStyle = 'black'
		this.context.beginPath();
		this.context.arc(0, 0, 1, 0, 2 * Math.PI, true);
		this.context.closePath();
		this.context.fill();
		// draw direction line
		this.context.strokeStyle = 'green';
		this.context.lineWidth = 1;
		this.context.beginPath();
		this.context.moveTo(0, 0);
		this.context.lineTo(0, 5);
		this.context.closePath();
		this.context.stroke();

		if (transform.rotation !== 0) {
			this.context.rotate(0 * Math.PI / 180);// reset rotate
		}

		this.context.setTransform(1, 0, 0, 1, 0, 0);// reset transform
	}
}

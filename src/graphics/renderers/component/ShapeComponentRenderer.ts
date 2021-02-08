import { Entity } from 'ecsy';
import { TransformComponent } from '../../../components/TransformComponent';
import { ShapeComponent } from '../../../components/ShapeComponent';
import { IComponentRenderer } from '../IComponentRenderer';
import { Rectangle } from '../../shapes/Rectangle';
import { RectangleRenderer } from '../shape/RectangleRenderer';
import { Debug } from '../../../Debug';

export class ShapeComponentRenderer implements IComponentRenderer {
	private readonly ractangleRenderer: RectangleRenderer;

	constructor(private readonly context: CanvasRenderingContext2D) {
		this.ractangleRenderer = new RectangleRenderer(this.context);
	}

	public render(entity: Entity): void {
		const shapeComponent = entity.getComponent(ShapeComponent);
		if (undefined === shapeComponent) {
			return; // skip
		}
		const transformComponent = entity.getComponent(TransformComponent);

		if (transformComponent) {
			this.context.rotate(transformComponent.rotation * Math.PI / 180);
		}

		if (shapeComponent.shape instanceof Rectangle) {
			this.ractangleRenderer.render(shapeComponent.shape);
			if (Debug.isEnabled('arrow')) {
				this.renderDirectionArrow();
			}
		}

		if (transformComponent && transformComponent.rotation !== 0) {
			this.context.rotate(0);// reset rotate
		}
	}

	private renderDirectionArrow(): void {
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
	}
}

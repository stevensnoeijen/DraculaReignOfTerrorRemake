import { Entity } from 'ecsy';
import { TransformComponent } from '../../../components/TransformComponent';
import { ShapeComponent } from '../../../components/ShapeComponent';
import { IComponentRenderer } from '../IComponentRenderer';
import { Rectangle } from '../../shapes/Rectangle';
import { RectangleRenderer } from '../shape/RectangleRenderer';
import { ArcRenderer } from '../shape/ArcRenderer';
import { Arc } from '../../shapes/Arc';
import { Circle } from '../../shapes/Circle';
import { PolylineRenderer } from '../shape/PolylineRenderer';
import { Polyline } from '../../shapes/Polyline';

export class ShapeComponentRenderer implements IComponentRenderer {
	private readonly ractangleRenderer: RectangleRenderer;
	private readonly arcRenderer: ArcRenderer;
	private readonly polylineRenderer: PolylineRenderer;
	// TODO: add linerenderer

	constructor(private readonly context: CanvasRenderingContext2D) {
		this.ractangleRenderer = new RectangleRenderer(this.context);
		this.arcRenderer = new ArcRenderer(this.context);
		this.polylineRenderer = new PolylineRenderer(this.context);
	}

	public render(entity: Entity): void {
		const shapeComponent = entity.getComponent(ShapeComponent);
		if (undefined === shapeComponent) {
			return; // skip
		}
		this.context.save();

		const transformComponent = entity.getComponent(TransformComponent);
		if (transformComponent) {
			this.context.rotate(transformComponent.rotation * Math.PI / 180);
		}

		if (shapeComponent.shape instanceof Rectangle) {
			this.ractangleRenderer.render(shapeComponent.shape);
		}
		if (shapeComponent.shape instanceof Arc || shapeComponent.shape instanceof Circle) {
			this.arcRenderer.render(shapeComponent.shape);
		}
		if (shapeComponent.shape instanceof Polyline) {
			this.polylineRenderer.render(shapeComponent.shape);
		}

		this.context.restore();
	}
}

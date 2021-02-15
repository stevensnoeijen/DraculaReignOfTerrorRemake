import { Entity } from 'ecsy';
import { TransformComponent } from '../../../components/TransformComponent';
import { ShapeComponent } from '../../../components/ShapeComponent';
import { IComponentRenderer } from '../IComponentRenderer';
import { ShapeRenderer } from '../ShapeRenderer';

export class ShapeComponentRenderer implements IComponentRenderer {

	private readonly shapeRenderer: ShapeRenderer;

	constructor(private readonly context: CanvasRenderingContext2D) {
		this.shapeRenderer = new ShapeRenderer(this.context);
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

		this.shapeRenderer.render(shapeComponent.shape);

		this.context.restore();
	}
}

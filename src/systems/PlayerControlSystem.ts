import { SelectorComponent } from '../components/SelectorComponent';
import { System, World, Attributes, Entity, SystemQueries } from 'ecsy';
import { SelectableComponent } from '../components/SelectableComponent';
import { TransformComponent } from '../components/TransformComponent';
import { VisibilityComponent } from '../components/VisibilityComponent';
import { SizeComponent } from '../components/SizeComponent';
import { EntityHelper } from '../helpers/EntityHelper';
import { Vector2 } from '../math/Vector2';
import { ShapeComponent } from '../components/ShapeComponent';
import { Rectangle } from '../graphics/shapes/Rectangle';
import { Input } from '../input/Input';

export class PlayerControlSystem extends System {
	public static queries: SystemQueries = {
		selectable: {
			components: [SelectableComponent],
		},
		selector: {
			components: [SelectorComponent],
		}
	};
	private static readonly SINGLE_UNIT_DISTANCE = 5;

	constructor(world: World, attributes: Attributes) {
		super(world, attributes);
	}

	/**
	 * Start selection.
	 */
	private startPosition: Vector2 | null = null;

	/**
	 * Used for deselecting units when clicking,
	 * but can be cancelled when dblclick-ing for moving entities.
	 */
	private deselectEntitiesTimeout: NodeJS.Timeout | null = null;

	private getSelector(): Entity {
		return this.queries.selector.results[0];
	}

	private getSelected(): Entity[] {
		return this.queries.selectable.results.filter(
			(entity) => entity.getComponent(SelectableComponent)?.selected || false
		);
	}

	private startSelect(): void {
		const selector = this.getSelector();
		const transform = selector.getMutableComponent(TransformComponent);
		if (undefined === transform) {
			return;
		}

		transform.position = this.startPosition!;

		const sizeComponent = selector.getMutableComponent(SizeComponent);
		if (undefined === sizeComponent) {
			return;
		}
		sizeComponent.height = 0;
		sizeComponent.width = 0;

		const shapeComponent = selector.getMutableComponent(ShapeComponent);
		if (!shapeComponent) {
			return;
		}
		if (shapeComponent) {
			(shapeComponent.shape as Rectangle).size.height = 0;
			(shapeComponent.shape as Rectangle).size.width = 0;
		}

		const visibilityComponent = selector.getMutableComponent(VisibilityComponent);
		if (!visibilityComponent) {
			return;
		}

		visibilityComponent.visible = true;
	}

	private updateSelect(): void {
		const selector = this.getSelector();
		const transformComponent = selector.getComponent(TransformComponent);
		if (!transformComponent) {
			return;
		}

		const width = Input.mousePosition.x - transformComponent.position.x;
		const height = Input.mousePosition.y - transformComponent.position.y;

		this.getSelected().forEach(EntityHelper.deselect);

		const sizeComponent = selector.getMutableComponent(SizeComponent);
		if (!sizeComponent) {
			return;
		}
		sizeComponent.width = width;
		sizeComponent.height = height;

		const shapeComponent = selector.getMutableComponent(ShapeComponent);
		if (!shapeComponent) {
			return;
		}
		if (shapeComponent.shape instanceof Rectangle) {
			shapeComponent.shape.size.width = width;
			shapeComponent.shape.size.height = height;
		}
	}

	private endSelect(): void {
		this.selectEntities();

		const selector = this.getSelector();
		const visibility = selector.getMutableComponent(VisibilityComponent);
		if (!visibility) {
			return;
		}

		visibility.visible = false;
		this.startPosition = null;
	}

	private selectEntities(): void {
		if (Vector2.distance(this.startPosition!, Input.mousePosition) < PlayerControlSystem.SINGLE_UNIT_DISTANCE) {
			// single unit select
			const entity = this.getEntityAtPosition(Input.mousePosition.x, Input.mousePosition.y);
			if (entity) {
				EntityHelper.select(entity);
			} else {
				if (!Input.isMouseDblClick()) {
					// deselect entities in .3 sec, or do double-click action
					this.deselectEntitiesTimeout = setTimeout(() => {
						this.getSelected().filter((entity) => !EntityHelper.isMoving(entity)).forEach(EntityHelper.deselect);
					}, 300);
				}
				return;
			}
		} else {
			this.selectEntitiesInsideSelector();
		}
	}

	private selectEntitiesInsideSelector(): void {
		const selector = this.getSelector();

		// get entities inside selector
		this.queries.selectable.results.filter((entity) =>
			EntityHelper.isObjectInsideContainer(entity, selector)
		).forEach((entity) => EntityHelper.select(entity));
	}

	private getEntityAtPosition(x: number, y: number): Entity | null {
		return (
			this.queries.selectable.results.find((entity) =>
				EntityHelper.isPositionInsideEntity(entity, x, y)
			) || null
		);
	}

	public execute(delta: number, time: number): void {
		if (Input.isMouseDblClick() && this.deselectEntitiesTimeout !== null) {
			clearTimeout(this.deselectEntitiesTimeout);
		}

		if (this.startPosition === null) {
			if (Input.isMouseButtonDown(0)) {
				this.startPosition = Input.mousePosition;
				this.startSelect();
			}
		} else {
			// selector is active
			if (Input.isMouseButtonUp(0)) {
				this.endSelect();
			} else if (Vector2.distance(this.startPosition, Input.mousePosition) > PlayerControlSystem.SINGLE_UNIT_DISTANCE) {
				// mouse is dragging
				this.updateSelect();
			}
		}
	}
}

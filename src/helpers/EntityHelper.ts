import { Entity } from 'ecsy';
import { TransformComponent } from '../components/TransformComponent';
import { SelectableComponent } from '../components/SelectableComponent';
import { SizeComponent } from '../components/SizeComponent';
import { VisibilityComponent } from '../components/VisibilityComponent';
import { MovePositionDirectComponent } from '../components/MovePositionDirectComponent';
import { Bounds } from '../math/collision/Bounds';
import { Vector2 } from '../math/Vector2';

export class EntityHelper {
	public static isVisible(entity: Entity, undefinedComponent = false): boolean {
		const visibilityComponent = entity.getComponent(VisibilityComponent);
		if (!visibilityComponent && undefinedComponent) {
			return true;
		} else if (visibilityComponent && false === visibilityComponent.visible) {
			return false;
		} else {
			return true;
		}
	}
	public static isPositionInsideEntity(
		entity: Entity,
		x: number,
		y: number
	): boolean {
		const transform = entity.getComponent(TransformComponent);
		const size = entity.getComponent(SizeComponent);

		if (!transform || !size) {
			// position or/and size isnt set
			return false;
		}

		const bounds = new Bounds(transform.position, new Vector2({
			x: size.width,
			y: size.height,
		}));
		return bounds.contains(new Vector2({
			x: x,
			y: y,
		}))
	}

	/**
	 * Based on {@link Position} and {@link Size}.
	 *
	 * @param {Entity} container
	 * @param {Entity} object is contained in the container
	 *
	 * @returns {boolean} true if the objects is inside the container
	 */
	public static isObjectInsideContainer(
		object: Entity,
		container: Entity
	): boolean {
		const containerTransform = container.getComponent(TransformComponent);
		if (!containerTransform) {
			return false;
		}
		const containerSize = container.getComponent(SizeComponent);
		if (!containerSize) {
			return false;
		}

		const objectTransform = object.getComponent(TransformComponent);
		if (!objectTransform) {
			return false;
		}

		return (
			objectTransform.position.x >= containerTransform.position.x &&
			objectTransform.position.x <= containerTransform.position.x + containerSize.width &&
			objectTransform.position.y >= containerTransform.position.y &&
			objectTransform.position.y <= containerTransform.position.y + containerSize.height
		);
	}

	public static deselect(entity: Entity): void {
		const selectable = entity.getMutableComponent(SelectableComponent);
		if (!selectable) {
			return;
		}
		selectable.selected = false;
	}

	public static select(entity: Entity): void {
		const selectable = entity.getMutableComponent(SelectableComponent);
		if (!selectable) {
			return;
		}
		selectable.selected = true;
	}

	public static isMoving(entity: Entity): boolean {
		const movePositionDirectComponent = entity.getComponent(MovePositionDirectComponent);
		if (!movePositionDirectComponent) {
			return false;
		}

		return movePositionDirectComponent.movePosition !== null;
	}
}

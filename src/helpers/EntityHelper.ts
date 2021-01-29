import { Entity } from 'ecsy';
import { TransformComponent } from '../components/TransformComponent';
import { SelectableComponent } from '../components/SelectableComponent';
import { SizeComponent } from '../components/SizeComponent';

type IsInsideOptions = {
	offsetWidth?: number;
	offsetHeight?: number;
};

type Position = {
	x: number;
	y: number;
};

export class EntityHelper {
	public static isPositionInsideEntity(
		entity: Entity,
		x: number,
		y: number,
		options?: IsInsideOptions
	): boolean {
		const transform = entity.getComponent(TransformComponent);
		const size = entity.getComponent(SizeComponent);

		if (!transform || !size) {
			// position or/and size isnt set
			return false;
		}

		return (
			x >= transform.position.x &&
			x <= transform.position.x + size.width + (options?.offsetWidth || 0) &&
			y >= transform.position.y &&
			y <= transform.position.y + size.height + (options?.offsetHeight || 0)
		);
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
}

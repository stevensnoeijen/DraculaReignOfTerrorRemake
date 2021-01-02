import { Entity } from 'ecsy';
import { PositionComponent } from '../components/PositionComponent';
import { SelectableComponent } from '../components/SelectableComponent';
import { SizeComponent } from '../components/SizeComponent';

type IsInsideOptions = {
	offsetWidth?: number;
	offsetHeight?: number;
};

export class EntityHelper {
	public static isPositionInsideEntity(
		entity: Entity,
		x: number,
		y: number,
		options?: IsInsideOptions
	): boolean {
		const position = entity.getComponent(PositionComponent);
		const size = entity.getComponent(SizeComponent);

		if (!position || !size) {
			// position or/and size isnt set
			return false;
		}

		return (
			x >= position.x &&
			x <= position.x + size.width + (options?.offsetWidth || 0) &&
			y >= position.y &&
			y <= position.y + size.height + (options?.offsetHeight || 0)
		);
	}

	/**
	 * Based on {@link Position} and {@link Size}.
	 *
	 * @param container
	 * @param object is contained in the container
	 *
	 * @returns true if the objects is inside the container
	 */
	public static isObjectInsideContainer(
		object: Entity,
		container: Entity
	): boolean {
		const containerPosition = container.getComponent(PositionComponent)!;
		const containerSize = container.getComponent(SizeComponent)!;

		const objectPosition = object.getComponent(PositionComponent)!;
		const objectSize = object.getComponent(SizeComponent)!;

		return (
			objectPosition.x >= containerPosition.x &&
			objectPosition.x + objectSize.width <=
			containerPosition.x + containerSize.width &&
			objectPosition.y >= containerPosition.y &&
			objectPosition.y + objectSize.height <=
			containerPosition.y + containerSize.height
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

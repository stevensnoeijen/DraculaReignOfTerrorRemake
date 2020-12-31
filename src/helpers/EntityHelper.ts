import { Entity } from 'ecsy';
import { Position } from '../components/Position';
import { Size } from '../components/Size';

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
		const position = entity.getComponent(Position);
		const size = entity.getComponent(Size);

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
		const containerPosition = container.getComponent(Position)!;
		const containerSize = container.getComponent(Size)!;

		const objectPosition = object.getComponent(Position)!;
		const objectSize = object.getComponent(Size)!;

		return (
			objectPosition.x >= containerPosition.x &&
			objectPosition.x + objectSize.width <=
				containerPosition.x + containerSize.width &&
			objectPosition.y >= containerPosition.y &&
			objectPosition.y + objectSize.height <=
				containerPosition.y + containerSize.height
		);
	}
}

import { System, Entity, SystemQueries, World, Attributes } from 'ecsy';
import * as PIXI from 'pixi.js';

import { SelectorComponent } from '../components/SelectorComponent';
import { SelectableComponent } from '../components/SelectableComponent';
import { TransformComponent } from '../components/TransformComponent';
import { VisibilityComponent } from '../components/VisibilityComponent';
import { SizeComponent } from '../components/SizeComponent';
import { EntityHelper } from '../EntityHelper';
import { Vector2 } from '../math/Vector2';
import { ShapeComponent } from '../components/ShapeComponent';
import { Rectangle } from '../graphics/shapes/Rectangle';
import { Input } from '../input/Input';

/**
 * System for selecting units with {@link Input}'s' mouse.
 */
export class PlayerSelectionSystem extends System {
	public static queries: SystemQueries = {
		selectable: {
			components: [SelectableComponent],
		},
	};
	private static readonly SINGLE_UNIT_DISTANCE = 5;

	/**
	 * Start selection.
	 */
	private startPosition: Vector2 | null = null;

	/**
	 * Used for deselecting units when clicking,
	 * but can be cancelled when dblclick-ing for moving entities.
	 */
	private deselectEntitiesTimeout: NodeJS.Timeout | null = null;

	private readonly app: PIXI.Application;
	private rectangle: PIXI.Graphics;

	constructor(world: World, attributes: Attributes) {
        super(world, attributes);
        this.app = attributes.app;
			
		this.rectangle = new PIXI.Graphics();
		this.rectangle.visible = false;
		this.app.stage.addChild(this.rectangle);
	}

	private getSelected(): Entity[] {
		return this.queries.selectable.results.filter(
			(entity) => entity.getComponent(SelectableComponent)?.selected || false
		);
	}

	private startSelect(): void {
		this.rectangle.visible = true;
	}

	private updateSelect(): void {
		const width = Input.mousePosition.x - this.startPosition!.x;
		const height = Input.mousePosition.y - this.startPosition!.y;

		this.getSelected().forEach(EntityHelper.deselect);

		this.rectangle.clear();
		this.rectangle.lineStyle(1, 0x000000);
		this.rectangle.drawRect(this.startPosition!.x, this.startPosition!.y, width, height);
	}

	private endSelect(): void {
		this.selectEntities();

		this.startPosition = null;

		this.rectangle.visible = false;
		this.rectangle.clear();
	}

	private selectEntities(): void {
		if (this.isSimpleClick()) {
			this.selectOneEntity();
		} else {
			this.selectMultipleEntities();
		}
	}

	private isSimpleClick(): boolean {
		return Vector2.distance(this.startPosition!, Input.mousePosition) < PlayerSelectionSystem.SINGLE_UNIT_DISTANCE;
	}

	private selectOneEntity(): void {
		// single unit select
		const entity = this.getEntityAtPosition(Input.mousePosition.x, Input.mousePosition.y);
		if (entity) {
			EntityHelper.select(entity);
		} else {
			if (!Input.isMouseDblClick()) {
				// deselect entities in .3 sec, or do double-click action
				this.deselectEntitiesTimeout = setTimeout(() => {
					this.getSelected().forEach(EntityHelper.deselect);
				}, 300);
			}
			return;
		}
	}

	private selectMultipleEntities(): void {
		const width = Input.mousePosition.x - this.startPosition!.x;
		const height = Input.mousePosition.y - this.startPosition!.y;

		// get entities inside selector
		this.queries.selectable.results.filter((entity) =>
			EntityHelper.isObjectInsideContainer(entity, {
				x: this.startPosition!.x,
				y: this.startPosition!.y,
				width,
				height,
			})
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
			} else if (Vector2.distance(this.startPosition, Input.mousePosition) > PlayerSelectionSystem.SINGLE_UNIT_DISTANCE) {
				// mouse is dragging
				this.updateSelect();
			}
		}
	}
}

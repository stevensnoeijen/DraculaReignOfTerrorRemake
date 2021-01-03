import { SelectorComponent } from '../components/SelectorComponent';
import { System, World, Attributes, Entity } from 'ecsy';
import { InputHandler } from '../input/InputHandler';
import { SelectableComponent } from '../components/SelectableComponent';
import { PositionComponent } from '../components/PositionComponent';
import { VisibilityComponent } from '../components/VisibilityComponent';
import { SizeComponent } from '../components/SizeComponent';
import { EntityHelper } from '../helpers/EntityHelper';
import { Tween } from '../tween';
import { Constants } from '../Constants';
import { MouseEventAdapter } from '../input/MouseEventAdapter';

export class PlayerControlSystem extends System {
	public static queries = {
		selectable: {
			components: [SelectableComponent],
			listen: {
				changed: true,
			},
		},
		selector: {
			components: [SelectorComponent],
		},
	};

	private canvas: HTMLCanvasElement;
	private mouseEventAdapter: MouseEventAdapter;

	private inputEventsQueue: (KeyboardEvent | MouseEvent)[] = [];
	private inputHandler: InputHandler;
	private dragged = false;
	private lastClickedTimeStamp = 0;

	constructor(world: World, attributes: Attributes) {
		super(world, attributes);

		this.canvas = attributes.canvas;

		this.handleKeyUp = this.handleKeyUp.bind(this);
		this.handleLeftMouseClick = this.handleLeftMouseClick.bind(this);
		this.handleLeftMouseDragStart = this.handleLeftMouseDragStart.bind(this);
		this.handleLeftMouseDragMove = this.handleLeftMouseDragMove.bind(this);
		this.handleLeftMouseDragEnd = this.handleLeftMouseDragEnd.bind(this);
		this.handleRightMouseClick = this.handleRightMouseClick.bind(this);
		this.handleLeftMouseDoubleClick = this.handleLeftMouseDoubleClick.bind(this);

		this.mouseEventAdapter = new MouseEventAdapter(this.canvas);
		this.mouseEventAdapter.addEventListener('leftmouseclick', this.handleLeftMouseClick);
		this.mouseEventAdapter.addEventListener('leftmousedragstart', this.handleLeftMouseDragStart);
		this.mouseEventAdapter.addEventListener('leftmousedragmove', this.handleLeftMouseDragMove);
		this.mouseEventAdapter.addEventListener('leftmousedragend', this.handleLeftMouseDragEnd);
		this.mouseEventAdapter.addEventListener('rightmouseclick', this.handleRightMouseClick);
		this.mouseEventAdapter.addEventListener('leftmousedoubleclick', this.handleLeftMouseDoubleClick);

		window.addEventListener('keyup', this.handleKeyUp);

		this.inputHandler = new InputHandler(this);
		// set commands
		// TODO: add
	}

	public execute(delta: number, time: number): void {
		this.processInputEvents();
	}

	private getSelector(): Entity {
		return this.queries.selector.results[0];
	}

	private handleLeftMouseClick(event: MouseEvent): void {
		this.deselectUnits();

		const entity = this.getEntityAtPosition(event.offsetX, event.offsetY);
		if (entity) {
			EntityHelper.select(entity);
		}
	}

	private handleLeftMouseDragStart(event: MouseEvent): void {
		const selector = this.getSelector();
		const position = selector.getMutableComponent(PositionComponent);
		if (undefined === position) {
			return;
		}

		position.x = event.offsetX;
		position.y = event.offsetY;

		const size = selector.getMutableComponent(SizeComponent);
		if (undefined === size) {
			return;
		}
		size.height = 0;
		size.width = 0;

		const visibility = selector.getMutableComponent(VisibilityComponent);
		if (!visibility) {
			return;
		}

		visibility.visible = true;
	}

	private handleLeftMouseDragMove(event: MouseEvent): void {
		const selector = this.getSelector();
		const position = selector.getComponent(PositionComponent);
		if (!position) {
			return;
		}

		const width = event.offsetX - position.x;
		const height = event.offsetY - position.y;

		const size = selector.getMutableComponent(SizeComponent);
		if (!size) {
			return;
		}
		size.width = width;
		size.height = height;
	}

	private handleLeftMouseDragEnd(event: MouseEvent): void {
		const selector = this.getSelector();
		const size = selector.getComponent(SizeComponent);
		if (!size) {
			return;
		}

		this.deselectUnits();
		this.selectUnits();

		const visibility = selector.getMutableComponent(VisibilityComponent);
		if (!visibility) {
			return;
		}

		visibility.visible = false;
	}

	private handleRightMouseClick(event: MouseEvent): void {
		this.moveUnits(event.offsetX, event.offsetY);
	}

	private handleLeftMouseDoubleClick(event: MouseEvent): void {
		this.moveUnits(event.offsetX, event.offsetY);
	}

	private deselectUnits(): void {
		this.getSelected().forEach(EntityHelper.deselect);
	}

	/**
	 * By selector
	 * 
	 * @returns {void}
	 */
	private selectUnits(): void {
		const selector = this.getSelector();

		// get entities inside selector
		this.queries.selectable.results
			.filter((entity) => EntityHelper.isObjectInsideContainer(entity, selector))
			.forEach(EntityHelper.select);
	}

	private processInputEvents(): void {
		if (this.inputEventsQueue.length > 0) {
			let event;
			while ((event = this.inputEventsQueue.pop())) {
				this.inputHandler.handle(event);
			}
		}
	}

	private moveUnits(x: number, y: number): void {
		this.getSelected().forEach((entity) => {
			const position = entity.getComponent(PositionComponent);
			if (!position) {
				return;
			}

			const distance = EntityHelper.distance(position, {
				x: x,
				y: y,
			})

			Tween.target(entity)
				.moveTo({
					x: x,
					y: y,
					speed: distance * Constants.ANIMATION_UNIT_SPEED,
				})
		});
	}

	private handleKeyUp(event: KeyboardEvent): void {
		this.inputEventsQueue.push(event);
	}

	/**
	 * @returns {boolean} if a entity is selected
	 */
	private selectEntityAtPosition(x: number, y: number): boolean {
		const entity = this.getEntityAtPosition(x, y);
		if (null === entity) {
			return false;
		}

		EntityHelper.select(entity);

		return true;
	}

	private getEntityAtPosition(x: number, y: number): Entity | null {
		return this.queries.selectable.results
			.find((entity) => EntityHelper.isPositionInsideEntity(entity, x, y)) || null;
	}

	private getSelected(): Entity[] {
		return this.queries.selectable.results
			.filter((entity) => entity.getComponent(SelectableComponent)?.selected || false);
	}
}

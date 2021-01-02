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

	private inputEventsQueue: (KeyboardEvent | MouseEvent)[] = [];
	private inputHandler: InputHandler;
	private dragged = false;
	private lastClickedTimeStamp = 0;

	constructor(world: World, attributes: Attributes) {
		super(world, attributes);

		this.canvas = attributes.canvas;

		this.handleMouseDown = this.handleMouseDown.bind(this);
		this.handleMouseUp = this.handleMouseUp.bind(this);
		this.handleMouseMove = this.handleMouseMove.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);

		this.canvas.addEventListener('mousedown', this.handleMouseDown);
		this.canvas.addEventListener('mousemove', this.handleMouseMove);
		this.canvas.addEventListener('mouseup', this.handleMouseUp);

		// disable right button click inside canvas
		this.canvas.addEventListener('contextmenu', (event) => {
			event.preventDefault();
		});

		window.addEventListener('keyup', this.handleKeyUp);

		this.inputHandler = new InputHandler(this);
		// set commands
		// TODO: add
	}

	public execute(delta: number, time: number): void {
		this.processInputEvents();
	}

	public getSelector(): Entity {
		return this.queries.selector.results[0];
	}

	private deselectUnits(): void {
		console.log('deselectin');
		this.getSelected().forEach(EntityHelper.deselect);
	}

	private selectUnits(): boolean {
		const selector = this.getSelector();

		const size = selector.getComponent(SizeComponent);
		if (!size) {
			return false;
		}
		if (0 === size.width && 0 === size.height) {
			console.log('select 1');
			const position = selector.getComponent(PositionComponent);
			if (!position) {
				return false;
			}

			// get entity at click location
			this.selectEntityAtPosition(position.x, position.y);
		} else {
			console.log('select multiple');
			// get entities inside selector
			this.queries.selectable.results
				.filter((entity) => EntityHelper.isObjectInsideContainer(entity, selector))
				.forEach(EntityHelper.select);
		}
	}

	private processInputEvents(): void {
		if (this.inputEventsQueue.length > 0) {
			let event;
			while ((event = this.inputEventsQueue.pop())) {
				this.inputHandler.handle(event);
			}
		}
	}

	private handleMouseDown(event: MouseEvent): void {
		if (0 === event.button) {
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
	}

	private handleMouseMove(event: MouseEvent): void {
		if (1 === event.buttons) {
			this.dragged = true;
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
	}

	private handleMouseUp(event: MouseEvent): void {
		console.log('up')
		if (0 === event.button) {
			if (this.lastClickedTimeStamp !== 0 && Date.now() - this.lastClickedTimeStamp <= 250) {
				console.log('double');
				this.moveUnits(event.offsetX, event.offsetY);
			} else {
				// check if selecting a unit
				const selector = this.getSelector();
				const size = selector.getComponent(SizeComponent);
				if (!size) {
					return;
				}
				if (size.width === 0 || size.height === 0) {
					const position = selector.getComponent(PositionComponent);
					if (!position) {
						return;
					}

					const entity = this.getEntityAtPosition(position.x, position.y);
					if (null === entity) {
						if (0 !== this.lastClickedTimeStamp && Date.now() - this.lastClickedTimeStamp > 250) {
							this.lastClickedTimeStamp = Date.now();
						} else {
							this.deselectUnits();
							this.lastClickedTimeStamp = 0;
						}
						return;// do nothing, this might be a move action
					}
				}

				this.deselectUnits();
				console.log('selected units');
				this.selectUnits();
				this.lastClickedTimeStamp = 0;

				const visibility = selector.getMutableComponent(VisibilityComponent);
				if (!visibility) {
					return;
				}

				visibility.visible = false;
			}
		} else if (2 === event.button) {
			// move unit
			this.moveUnits(event.offsetX, event.offsetY);
		}
		this.lastClickedTimeStamp = Date.now();
		this.dragged = false;
	}

	private moveUnits(x: number, y: number): void {
		this.getSelected().forEach((entity) => {
			console.log('move unit');

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
		})
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

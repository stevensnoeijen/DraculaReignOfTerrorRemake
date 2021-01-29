import { SelectorComponent } from '../components/SelectorComponent';
import { System, World, Attributes, Entity, SystemQueries } from 'ecsy';
import { InputHandler } from '../input/InputHandler';
import { SelectableComponent } from '../components/SelectableComponent';
import { TransformComponent } from '../components/TransformComponent';
import { VisibilityComponent } from '../components/VisibilityComponent';
import { SizeComponent } from '../components/SizeComponent';
import { EntityHelper } from '../helpers/EntityHelper';
import { MouseEventAdapter } from '../input/MouseEventAdapter';
import { SelectUnitsCommand } from '../input/commands/SelectUnitsCommand';
import { DeselectUnitsCommand } from '../input/commands/DeselectUnitsCommand';
import { Grid, Path, PathFinder } from '../helpers/PathFinder';
import { Constants } from '../Constants';
import { ColliderComponent } from '../components/ColliderComponent';
import { MoveUnitsCommand } from '../input/commands/MoveUnitsCommand';
import { Vector2 } from '../math/Vector2';

export class PlayerControlSystem extends System {
	public static queries: SystemQueries = {
		selectable: {
			components: [SelectableComponent],
			listen: {
				changed: true,
			},
		},
		selector: {
			components: [SelectorComponent],
		},
		colliders: {
			components: [ColliderComponent],
		}
	};

	private canvas: HTMLCanvasElement;
	private mouseEventAdapter: MouseEventAdapter;

	private inputEventsQueue: KeyboardEvent[] = [];
	private inputHandler: InputHandler;

	constructor(world: World, attributes: Attributes) {
		super(world, attributes);

		this.canvas = attributes.canvas;

		this.handleKeyUp = this.handleKeyUp.bind(this);
		this.handleLeftMouseClick = this.handleLeftMouseClick.bind(this);
		this.handleLeftMouseDragStart = this.handleLeftMouseDragStart.bind(this);
		this.handleLeftMouseDragMove = this.handleLeftMouseDragMove.bind(this);
		this.handleLeftMouseDragEnd = this.handleLeftMouseDragEnd.bind(this);
		this.handleRightMouseClick = this.handleRightMouseClick.bind(this);
		this.handleLeftMouseDoubleClick = this.handleLeftMouseDoubleClick.bind(
			this
		);

		this.mouseEventAdapter = new MouseEventAdapter(this.canvas);
		this.mouseEventAdapter.addEventListener(
			'leftmouseclick',
			this.handleLeftMouseClick
		);
		this.mouseEventAdapter.addEventListener(
			'leftmousedragstart',
			this.handleLeftMouseDragStart
		);
		this.mouseEventAdapter.addEventListener(
			'leftmousedragmove',
			this.handleLeftMouseDragMove
		);
		this.mouseEventAdapter.addEventListener(
			'leftmousedragend',
			this.handleLeftMouseDragEnd
		);
		this.mouseEventAdapter.addEventListener(
			'rightmouseclick',
			this.handleRightMouseClick
		);
		this.mouseEventAdapter.addEventListener(
			'leftmousedoubleclick',
			this.handleLeftMouseDoubleClick
		);

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

	private getSelected(): Entity[] {
		return this.queries.selectable.results.filter(
			(entity) => entity.getComponent(SelectableComponent)?.selected || false
		);
	}

	private handleLeftMouseClick(event: MouseEvent): void {
		new DeselectUnitsCommand(this.getSelected()).execute();

		const entity = this.getEntityAtPosition(event.offsetX, event.offsetY);
		if (entity) {
			new SelectUnitsCommand([entity]).execute();
		}
	}

	private handleLeftMouseDragStart(event: MouseEvent): void {
		const selector = this.getSelector();
		const transform = selector.getMutableComponent(TransformComponent);
		if (undefined === transform) {
			return;
		}

		transform.position = new Vector2({
			x: event.offsetX,
			y: event.offsetY,
		});

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
		const transform = selector.getComponent(TransformComponent);
		if (!transform) {
			return;
		}

		const width = event.offsetX - transform.position.x;
		const height = event.offsetY - transform.position.y;

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

		new DeselectUnitsCommand(this.getSelected()).execute();
		this.selectUnitsInsideSelector();

		const visibility = selector.getMutableComponent(VisibilityComponent);
		if (!visibility) {
			return;
		}

		visibility.visible = false;
	}

	/**
	 * Create grid of the current state of the game,
	 * used for pathfinding.
	 * 
	 * @returns {Grid}
	 */
	private createGrid(): Grid {
		// init with default values with map-size
		const gridWidth = Math.ceil(Constants.GAME_WIDTH / Constants.UNIT_SIZE);
		const gridHeight = Math.ceil(Constants.GAME_HEIGHT / Constants.UNIT_SIZE);
		const grid: Grid = Array.from(Array(gridHeight)).map(() => Array.from(Array(gridWidth)).map(() => 0))

		for (const entity of this.queries.colliders.results) {
			const transform = entity.getComponent(TransformComponent);
			if (!transform) {
				continue;
			}
			// ToDo: add later for bigger units
			// const collider = entity.getComponent(ColliderComponent);
			// if (!collider) {
			// 	continue;
			// }

			const x = Math.floor(transform.position.x / Constants.UNIT_SIZE)
			const y = Math.floor(transform.position.y / Constants.UNIT_SIZE)

			grid[y][x] = 1;// set position is blocked
		}

		return grid;
	}

	private translatePositionToGrid(pos: number): number {
		return Math.floor(pos / Constants.UNIT_SIZE)
	}

	private translateGridToPosition(grid: number) {
		return grid * Constants.UNIT_SIZE + (Constants.UNIT_SIZE / 2);
	}

	private handleRightMouseClick(event: MouseEvent): void {
		this.moveUnitsTo(event);
	}

	private handleLeftMouseDoubleClick(event: MouseEvent): void {
		this.moveUnitsTo(event);
	}

	private moveUnitsTo(event: MouseEvent): void {
		const selected = this.getSelected();
		if (selected.length === 0) {
			return;
		}

		const grid = this.createGrid();
		const movements = selected.map((entity) => {
			const transform = entity.getComponent(TransformComponent);
			if (!transform) {
				return null;
			}

			const start = {
				x: this.translatePositionToGrid(transform.position.x),
				y: this.translatePositionToGrid(transform.position.y),
			}
			const destination = {
				x: this.translatePositionToGrid(event.offsetX),
				y: this.translatePositionToGrid(event.offsetY),
			};

			const path = PathFinder.findPath(grid, start, destination).map((item) => ({
				x: this.translateGridToPosition(item.x),
				y: this.translateGridToPosition(item.y),
			}));

			const distance = EntityHelper.distance(transform.position, {
				x: this.translateGridToPosition(destination.x),
				y: this.translateGridToPosition(destination.y),
			});

			return {
				entity: entity,
				path: path,
				duration: distance / Constants.UNIT_SIZE * Constants.ANIMATION_UNIT_SPEED,
			};
		}).filter(Boolean) as { entity: Entity, path: Path, duration: number }[];// filter null values

		new MoveUnitsCommand(movements).execute();
	}

	private selectUnitsInsideSelector(): void {

		const selector = this.getSelector();

		// get entities inside selector
		const units = this.queries.selectable.results
			.filter((entity) =>
				EntityHelper.isObjectInsideContainer(entity, selector)
			);

		new SelectUnitsCommand(units).execute();
	}

	private processInputEvents(): void {
		if (this.inputEventsQueue.length > 0) {
			let event;
			while ((event = this.inputEventsQueue.pop())) {
				this.inputHandler.handle(event);
			}
		}
	}

	private handleKeyUp(event: KeyboardEvent): void {
		this.inputEventsQueue.push(event);
	}

	private getEntityAtPosition(x: number, y: number): Entity | null {
		return (
			this.queries.selectable.results.find((entity) =>
				EntityHelper.isPositionInsideEntity(entity, x, y)
			) || null
		);
	}
}

import { SelectorComponent } from '../components/SelectorComponent';
import { System, World, Attributes, Entity } from 'ecsy';
import { InputHandler } from '../input/InputHandler';
import { SelectableComponent } from '../components/SelectableComponent';
import { PositionComponent } from '../components/PositionComponent';
import { VisibilityComponent } from '../components/VisibilityComponent';
import { SizeComponent } from '../components/SizeComponent';

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

	private selecting = false;

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

		window.addEventListener('keyup', this.handleKeyUp);

		this.inputHandler = new InputHandler(this);
		// set commands
		// TODO: add
	}

	public execute(delta: number, time: number): void {
		this.processInputEvents();
	}

	private processInputEvents(): void {
		if (this.inputEventsQueue.length > 0) {
			let event;
			while ((event = this.inputEventsQueue.pop())) {
				this.inputHandler.handle(event);
			}
		}
	}

	public getSelector(): Entity {
		return this.queries.selector.results[0];
	}

	private handleMouseDown(event: MouseEvent): void {
		this.selecting = true;

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

	private handleMouseMove(event: MouseEvent): void {
		if (this.selecting) {
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
		this.selecting = false;

		const selector = this.getSelector();
		const visibility = selector.getMutableComponent(VisibilityComponent);
		if (!visibility) {
			return;
		}

		visibility.visible = false;
	}

	private handleKeyUp(event: KeyboardEvent): void {
		this.inputEventsQueue.push(event);
	}
}

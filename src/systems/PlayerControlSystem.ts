import { SelectorComponent } from '../components/SelectorComponent';
import { System, World, Attributes, Entity } from 'ecsy';
import { InputHandler } from '../input/InputHandler';
import { MoveDownCommand } from '../input/commands/MoveDownCommand';
import { MoveLeftCommand } from '../input/commands/MoveLeftCommand';
import { MoveRightCommand } from '../input/commands/MoveRightCommand';
import { MoveUpCommand } from '../input/commands/MoveUpCommand';
import { SwitchCommand } from '../input/commands/SwitchCommand';
import { SelectableComponent } from '../components/SelectableComponent';

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

	constructor(world: World, attributes: Attributes) {
		super(world, attributes);

		this.canvas = attributes.canvas;

		this.handleClick = this.handleClick.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);

		this.canvas.addEventListener('click', this.handleClick);
		window.addEventListener('keyup', this.handleKeyUp);

		this.inputHandler = new InputHandler(this);
		// set commands
		this.inputHandler.setCommand('ArrowDown', MoveDownCommand);
		this.inputHandler.setCommand('ArrowLeft', MoveLeftCommand);
		this.inputHandler.setCommand('ArrowRight', MoveRightCommand);
		this.inputHandler.setCommand('ArrowUp', MoveUpCommand);
		this.inputHandler.setCommand('Space', SwitchCommand);
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

	private handleClick(event: MouseEvent): void {
		this.inputEventsQueue.push(event);
	}

	private handleKeyUp(event: KeyboardEvent): void {
		this.inputEventsQueue.push(event);
	}
}

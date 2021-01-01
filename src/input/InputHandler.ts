import { Constants } from '../Constants';
import { PlayerControlSystem } from '../systems/PlayerControlSystem';
import { CommandFactory } from './CommandFactory';
import { MoveToCommand } from './commands/MoveToCommand';
import { SwitchCommand } from './commands/SwitchCommand';
import { ICommandConstructor } from './ICommandConstructor';
import { EntityHelper } from '../helpers/EntityHelper';
import { PositionComponent } from '../components/PositionComponent';
import { MovableComponent } from '../components/MovableComponent';

export class InputHandler {
	private readonly commandFactory: CommandFactory;

	constructor(private readonly system: PlayerControlSystem) {
		this.commandFactory = new CommandFactory();
	}

	public setCommand(
		keyCode: string,
		constructor: ICommandConstructor | null
	): void {
		this.commandFactory.setCommand(keyCode, constructor);
	}

	public handle(event: KeyboardEvent | MouseEvent): void {
		if ('key' in event) {
			// KeyboardEvent
			const command = this.commandFactory.createCommand(event, this.system);
			command?.execute();
		} else {
			// MouseEvent
			if (this.hasClickedInsideSelector(event)) {
				new SwitchCommand(this.system).execute();
			} else {
				const { x, y } = this.translateToGridPositions(event);
				// move selector
				new MoveToCommand(this.system, x, y).execute();
			}
		}
	}

	private hasClickedInsideSelector(event: MouseEvent): boolean {
		return EntityHelper.isPositionInsideEntity(
			this.system.getSelector(),
			event.offsetX,
			event.offsetY,
			{ offsetWidth: -Constants.BLOCK_SIZE }
		);
	}

	private translateToGridPositions(
		event: MouseEvent
	): { x: number; y: number } {
		// snap to place in the grid
		const y =
			event.offsetY -
			(event.offsetY % Constants.BLOCK_SIZE) -
			this.getYOffset();
		let x = event.offsetX - (event.offsetX % Constants.BLOCK_SIZE);

		// when clicking at the right edge, move 1 block back
		if (x >= Constants.GAME_WIDTH - Constants.BLOCK_SIZE * 1) {
			x -= Constants.BLOCK_SIZE;
		}

		return {
			x: x,
			y: y,
		};
	}

	/**
	 * Calculate offset because of the moving of the entities up
	 *
	 * @returns {number} y offset
	 */
	private getYOffset(): number {
		const entity = this.system.queries.selectable.results.find(
			(entity) => !entity.getComponent(MovableComponent)?.moving
		);
		if (!entity) {
			return 0;
		}

		const position = entity.getComponent(PositionComponent);
		if (!position) {
			return 0;
		}
		return Constants.BLOCK_SIZE - (position.y % Constants.BLOCK_SIZE);
	}
}

import { PlayerControlSystem } from '../systems/PlayerControlSystem';
import { CommandFactory } from './CommandFactory';
import { ICommandConstructor } from './ICommandConstructor';

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
			// TODO
		}
	}
}

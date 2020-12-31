import { PlayerControlSystem } from '../systems/PlayerControlSystem';
import { ICommand } from './commands/ICommand';
import { ICommandConstructor } from './ICommandConstructor';

export class CommandFactory {
	private _commandsMap: { [keyCode: string]: ICommandConstructor | null } = {};

	public setCommand(
		keyCode: string,
		command: ICommandConstructor | null
	): void {
		this._commandsMap[keyCode] = command;
	}

	public createCommand(
		event: KeyboardEvent,
		system: PlayerControlSystem
	): ICommand | null {
		const constructor = this._commandsMap[event.code] || null;
		if (constructor) {
			const command = new constructor(system);
			return command;
		}
		return null;
	}
}

import { PlayerControlSystem } from '../systems/PlayerControlSystem';
import { ICommand } from './commands/ICommand';

export interface ICommandConstructor {
	new (system: PlayerControlSystem): ICommand;
}

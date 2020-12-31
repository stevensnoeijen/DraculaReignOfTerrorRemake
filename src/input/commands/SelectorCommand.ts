import { Entity } from 'ecsy';
import { PlayerControlSystem } from '../../systems/PlayerControlSystem';
import { ICommand } from './ICommand';

export abstract class SelectorCommand implements ICommand {
	protected selector: Entity;

	constructor(system: PlayerControlSystem) {
		this.selector = system.getSelector();
	}

	public abstract execute(): void;
}

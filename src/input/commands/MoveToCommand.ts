import { Constants } from '../../Constants';
import { PlayerControlSystem } from '../../systems/PlayerControlSystem';
import { Tween } from '../../tween';
import { SelectorCommand } from './SelectorCommand';

export class MoveToCommand extends SelectorCommand {
	constructor(
		system: PlayerControlSystem,
		private readonly x: number,
		private readonly y: number
	) {
		super(system);
	}

	public execute(): void {
		if (this.canMoveTo()) {
			Tween.target(this.selector).moveTo({
				x: this.x,
				y: this.y,
			});
		}
	}

	private canMoveTo(): boolean {
		return (
			this.x >= 0 &&
			this.x < Constants.GAME_WIDTH - Constants.BLOCK_SIZE &&
			this.y >= 0 &&
			this.y < Constants.GAME_HEIGHT
		);
	}
}

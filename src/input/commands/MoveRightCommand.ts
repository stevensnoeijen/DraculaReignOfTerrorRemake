import { PositionComponent } from '../../components/PositionComponent';
import { Constants } from '../../Constants';
import { Tween } from '../../tween';
import { SelectorCommand } from './SelectorCommand';

export class MoveRightCommand extends SelectorCommand {
	public execute(): void {
		const position = this.selector.getComponent(PositionComponent)!;

		if (position.x < Constants.GAME_WIDTH - Constants.BLOCK_SIZE * 2) {
			Tween.target(this.selector).moveTo({
				x: position.x + Constants.BLOCK_SIZE,
			});
		}
	}
}

import { PositionComponent } from '../../components/PositionComponent';
import { Constants } from '../../Constants';
import { Tween } from '../../tween';
import { SelectorCommand } from './SelectorCommand';

export class MoveDownCommand extends SelectorCommand {
	public execute(): void {
		const position = this.selector.getComponent(PositionComponent)!;

		if (position.y < Constants.GAME_HEIGHT - Constants.BLOCK_SIZE) {
			Tween.target(this.selector).moveTo({
				y: position.y + Constants.BLOCK_SIZE,
			});
		}
	}
}

import { Position } from '../../components/Position';
import { Constants } from '../../Constants';
import { Tween } from '../../tween';
import { SelectorCommand } from './SelectorCommand';

export class MoveUpCommand extends SelectorCommand {
	public execute(): void {
		const position = this.selector.getComponent(Position)!;

		if (position.y > 0) {
			Tween.target(this.selector).moveTo({
				y: position.y - Constants.BLOCK_SIZE,
			});
		}
	}
}

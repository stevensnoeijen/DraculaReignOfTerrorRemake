import { PositionComponent } from '../../components/PositionComponent';
import { Constants } from '../../Constants';
import { Tween } from '../../tween';
import { SelectorCommand } from './SelectorCommand';

export class MoveLeftCommand extends SelectorCommand {
	public execute(): void {
		const position = this.selector.getComponent(PositionComponent)!;

		if (position.x > 0) {
			Tween.target(this.selector).moveTo({
				x: position.x - Constants.BLOCK_SIZE,
			});
		}
	}
}

import { Entity } from 'ecsy';
import { PositionComponent } from '../../components/PositionComponent';
import { Constants } from '../../Constants';
import { EntityHelper } from '../../helpers/EntityHelper';
import { PlayerControlSystem } from '../../systems/PlayerControlSystem';
import { Tween } from '../../tween';
import { SelectorCommand } from './SelectorCommand';

export class SwitchCommand extends SelectorCommand {
	constructor(private readonly system: PlayerControlSystem) {
		super(system);
	}

	public execute(): void {
		const blocks = this.getBlocksAtSelector(this.selector);
		if (!blocks.left && !blocks.right) {
			return;
		}

		const selectorPosition = this.selector.getComponent(PositionComponent)!;

		if (blocks.left) {
			Tween.target(blocks.left).moveTo({
				x: selectorPosition.x + Constants.BLOCK_SIZE,
				speed: Constants.ANIMATION_SWITCH_SPEED,
			});
		}
		if (blocks.right) {
			Tween.target(blocks.right).moveTo({
				x: selectorPosition.x,
				speed: Constants.ANIMATION_SWITCH_SPEED,
			});
		}
	}

	private getBlocksAtSelector(
		selector: Entity
	): { left: Entity | null; right: Entity | null } {
		const entities = this.system.queries.selectable.results.filter((entity) =>
			EntityHelper.isObjectInsideContainer(entity, selector)
		);

		const selectorPosition = selector.getComponent(PositionComponent)!;
		const left = entities.find(
			(entity) => entity.getComponent(PositionComponent)!.x === selectorPosition.x
		);
		const right = entities.find(
			(entity) =>
				entity.getComponent(PositionComponent)!.x >=
				selectorPosition.x + Constants.BLOCK_SIZE
		);

		return {
			left: left || null,
			right: right || null,
		};
	}
}

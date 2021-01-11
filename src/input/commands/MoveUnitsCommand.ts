import { Entity } from 'ecsy';
import { PositionComponent } from '../../components/PositionComponent';
import { Constants } from '../../Constants';
import { EntityHelper } from '../../helpers/EntityHelper';
import { Tween } from '../../graphics/tween/Tween';
import { ICommand } from './ICommand';

type Destination = { x: number; y: number };

export class MoveUnitsCommand implements ICommand {
    constructor(private readonly entities: Entity[], private readonly destination: Destination) {

    }

    public execute(): void {
        this.entities.forEach((entity) => {
            const position = entity.getComponent(PositionComponent);
            if (!position) {
                return;
            }

            const distance = EntityHelper.distance(position, {
                x: this.destination.x,
                y: this.destination.y,
            });

            Tween.target(entity).moveTo({
                x: this.destination.x,
                y: this.destination.y,
                speed: distance * Constants.ANIMATION_UNIT_SPEED,
            }).start();
        });
    }

}
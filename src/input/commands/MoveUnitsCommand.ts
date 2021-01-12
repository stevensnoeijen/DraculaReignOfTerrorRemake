import { Tween } from '../../graphics/tween/Tween';
import { ICommand } from './ICommand';
import { Path } from '../../helpers/PathFinder';
import { Entity } from 'ecsy';

type Destination = { x: number; y: number };

export class MoveUnitsCommand implements ICommand {
    constructor(private readonly movements: { entity: Entity, path: Path, duration: number }[]) {

    }

    public execute(): void {
        this.movements.forEach((movement) => {
            Tween.target(movement.entity).path({
                path: movement.path,
                duration: movement.duration,
            }).start();
        });
    }
}
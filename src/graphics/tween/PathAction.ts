import { Entity } from 'ecsy';
import { PositionComponent } from '../../components/PositionComponent';
import { IPosition } from '../IPosition';
import { ITweenAction } from './ITweenAction';
import { MoveToAction } from './MoveToAction';

export interface IPathActionProps {
    path: IPosition[];
    /**
     * per move
     */
    duration: number;
}

export class PathAction implements ITweenAction {
    private _done = false;
    private moves: MoveToAction[];

    constructor(private readonly entity: Entity, props: IPathActionProps) {
        const entityPosition = entity.getComponent(PositionComponent);
        if (!entityPosition) {
            this.moves = [];
            return;
        }
        let previousPosition = { x: entityPosition.position.x, y: entityPosition.position.y, };

        this.moves = props.path.map((item) => {
            const move = new MoveToAction(this.entity, {
                startPosition: previousPosition,
                destination: item,
                duration: props.duration,
            });
            previousPosition = item;

            return move;
        });
    }

    public update(delta: number): void {
        const move = this.moves[0];
        if (!move) {
            // if there is no next move-action
            this._done = true;
            return;
        }
        move.update(delta);
        if (move.done) {
            // if done, remove current and let next frame get the next move
            this.moves.shift();
            return;
        }
        move.update(delta);
    }

    public get done(): boolean {
        return this._done;
    }

}
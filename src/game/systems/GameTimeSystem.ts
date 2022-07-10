import { System } from 'ecsy';
import { GameTime } from '../GameTime';

export class GameTimeSystem extends System {
    public execute(delta: number, time: number): void {
        GameTime.delta = delta;
    }
}
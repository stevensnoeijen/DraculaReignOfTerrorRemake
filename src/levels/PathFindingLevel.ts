import { Level } from './Level';
import { Vector2 } from '../math/Vector2';
import { EntityFactory } from './../EntityFactory';
import { maze } from './maze';

export class PathFindingLevel extends Level {
    public get collisionMap(): number[][] {
        return maze;
    }

    public load(): void {
        EntityFactory.createUnit(this.world, {
            position: new Vector2(24, 24),// cell 1,1
            color: 'red',
            texture: this.app.loader.resources.swordsmen.texture!,
        });
    }
}
import { cellPositionToVector } from './../utils';
import { MapSystem } from './../systems/render/MapSystem';
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
            position: cellPositionToVector(0, 0),
            color: 'red',
            texture: this.app.loader.resources.swordsmen.texture!,
        });

        this.world.getSystem(MapSystem).setMap(this.collisionMap);
    }
}
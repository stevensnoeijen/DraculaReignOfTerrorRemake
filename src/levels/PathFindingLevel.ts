import * as PIXI from 'pixi.js';
import { World } from 'ecsy';

import { cellPositionToVector } from './../utils';
import { Level } from './Level';
import { EntityFactory } from './../EntityFactory';
import { generateMaze, getGridSizeByScreen } from './utils';

export class PathFindingLevel extends Level {
    private map: number[][];

    constructor(app: PIXI.Application, world: World) {
        super(app, world);

        this.map = generateMaze(getGridSizeByScreen(app));
    }

    public get collisionMap(): number[][] {
        return this.map;
    }

    public load(): void {
        EntityFactory.createUnit(this.world, {
            position: cellPositionToVector(1, 1),
            color: 'red',
            texture: this.app.loader.resources.swordsmen.texture!,
            team: {
                number: 1,
            }
        });

        EntityFactory.createUnit(this.world, {
            position: cellPositionToVector(3, 1),
            color: 'red',
            texture: this.app.loader.resources.swordsmen.texture!,
            team: {
                number: 2,
            }
        });
    }
}
import { createEmptyGrid, getWorldCellSizeByScreen } from './utils';
import { World } from 'ecsy';
import * as PIXI from 'pixi.js';

import { Constants } from '../Constants';
import { EntityFactory } from '../EntityFactory';
import { Vector2 } from '../math/Vector2';
import { toGridPosition } from '../utils';
import { Level } from './Level';

export class RandomUnitsLevel extends Level {
    private readonly _collisionMap: number[][];

    constructor(app: PIXI.Application, world: World) {
        super(app, world);

        this._collisionMap = createEmptyGrid(getWorldCellSizeByScreen(app));
    }

    public get collisionMap(): number[][] {
        return this._collisionMap;
    }

    public load(): void {
        Array.from(Array(100)).forEach(() => {
            const vector = toGridPosition(new Vector2(
                Math.round(
                    Math.random() * this.app.screen.width,
                ), 
                Math.round(
                    Math.random() * this.app.screen.height,
                ) + (Constants.CELL_SIZE / 2)
            ));
    
            EntityFactory.createUnit(this.world, {
                position: vector,
                color: 'red',
                texture: this.app.loader.resources.swordsmen.texture!,
            });
        });
    }
}
import { World } from 'ecsy';
import * as PIXI from 'pixi.js';

import { Constants } from '../Constants';
import { EntityFactory } from '../EntityFactory';
import { Vector2 } from '../math/Vector2';
import { toGridPosition } from '../systems/player/utils';
import { Level } from './Level';

export class RandomUnitsLevel implements Level {
    public load(app: PIXI.Application, world: World): void {
        Array.from(Array(100)).forEach(() => {
            const vector = toGridPosition(new Vector2(
                Math.round(
                    Math.random() * app.screen.width,
                ), 
                Math.round(
                    Math.random() * app.screen.height,
                ) + (Constants.CELL_SIZE / 2)
            ));
    
            EntityFactory.createUnit(world, {
                position: vector,
                color: 'red',
                texture: app.loader.resources.swordsmen.texture!,
            });
        });
    }
}
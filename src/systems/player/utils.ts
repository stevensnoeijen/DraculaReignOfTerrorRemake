import { Constants } from './../../Constants';
import * as PIXI from 'pixi.js';

import { Vector2 } from './../../math/Vector2';

export const toGridPosition = (vector: Vector2): Vector2 => { 
    return new Vector2(
        vector.x - (vector.x % Constants.CELL_SIZE) + (Constants.CELL_SIZE / 2),
        vector.y - (vector.y % Constants.CELL_SIZE) + (Constants.CELL_SIZE / 2)
    );
}
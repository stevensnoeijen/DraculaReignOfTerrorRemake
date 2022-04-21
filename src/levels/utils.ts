import * as PIXI from 'pixi.js';

import { Constants } from "../Constants";

type Size = { width: number; height: number };

export const getWorldCellSizeByScreen = (app: PIXI.Application): Size => {
    return {
        width: Math.ceil(app.screen.width / Constants.CELL_SIZE),
        height: Math.ceil(app.screen.height / Constants.CELL_SIZE),
    };    
};

export const createEmptyGrid = (size: Size): number[][] => {
    return Array.from({ length: size.height }, () => Array.from({ length: size.width }, () => 0))
}
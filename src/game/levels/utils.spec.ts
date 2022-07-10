import * as PIXI from 'pixi.js';

import { getGridSizeByScreen, createEmptyGrid } from "./utils";

describe('getWorldCellSizeByScreen', () => {
    it('should give ceil calculation', () => {
        expect(getGridSizeByScreen({ screen: { width: 800, height: 600 } } as PIXI.Application)).toEqual({
            width: 50,
            height: 38,
        });
    });
});

describe('createEmptyGrid', () => {
    it('should create number array with 0\'s by given size', () => {
        const grid = createEmptyGrid({ width: 100, height: 100 });

        expect(grid.length).toBe(100);
        expect(grid[0].length).toBe(100);
    });
});
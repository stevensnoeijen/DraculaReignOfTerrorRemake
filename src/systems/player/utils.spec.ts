import * as PIXI from 'pixi.js';
import { Vector2 } from '../../math/Vector2';

import { toGridPosition } from './utils';

describe('toGridPosition', () => {
    it('should center to grid position', () => {
        const position = toGridPosition({ screen: { width: 1000, height: 1000 } } as PIXI.Application, new Vector2(101, 60));

        expect(position.x).toEqual(104);
        expect(position.y).toEqual(56);
    });
});
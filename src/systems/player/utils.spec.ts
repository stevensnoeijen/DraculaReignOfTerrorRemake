import { Vector2 } from '../../math/Vector2';

import { toGridPosition } from './utils';

describe('toGridPosition', () => {
    it('should center to grid position', () => {
        const position = toGridPosition(new Vector2(101, 60));

        expect(position.x).toEqual(104);
        expect(position.y).toEqual(56);
    });
});
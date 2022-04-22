import { Vector2 } from './math/Vector2';
import { arrayIncludesByEquals, getOptions, toEqual, toCenterGridPosition, toWorldPosition, toGridPosition, convertPathfindingPathToPositions } from './utils';
import * as PathFinding from './ai/Pathfinding';

describe('getOptions', () => {
    const mockWindowLocation = (url: string) => {
        // @ts-ignore
        delete window.location;
        // @ts-ignore
        window.location = new URL(url);
    };

    it('should give empty object when location.hash is empty', () => {
        mockWindowLocation('http://localhost:3000/');

        expect(getOptions()).toEqual({});
    });

    it('should give empty array when only key is set', () => {
        mockWindowLocation('http://localhost:3000/#debug=');

        expect(getOptions()).toEqual({debug: []});
    });

    it('should give array when key value is set', () => {
        mockWindowLocation('http://localhost:3000/#debug=grid');

        expect(getOptions()).toEqual({debug: ['grid']});
    });

    it('should give array when value with commas is set', () => {
        mockWindowLocation('http://localhost:3000/#debug=grid,fps');

        expect(getOptions()).toEqual({debug: ['grid', 'fps']});
    });
});

const returnTrue = (other: unknown) => true;
const returnFalse = (other: unknown) => false;

describe('toEqual', () => {
    it('should return false when item is not equal', () => {
        const object = {
            equals: returnTrue,
        };

        const predicate = toEqual(object);
        
        expect(predicate({ equals: returnFalse }, 0, [])).toEqual(false);
    });

    it('should return true when item is equal', () => {
        const object = {
            equals: returnFalse,
        };

        const predicate = toEqual(object);
        
        expect(predicate({ equals: returnTrue }, 0, [])).toEqual(true);
    });
});

describe('arrayIncludesByEquals', () => {
    it('should return false if no item is found by equals', () => {
        const array = Array.from({ length: 3 }, () => ({ equals: returnFalse }));
        
        expect(arrayIncludesByEquals(array, { equals: returnFalse })).toBe(false);
    });

    it('should return true when item is found by equals', () => {
        const array = Array.from({ length: 3 }, () => ({ equals: returnTrue }));
        
        expect(arrayIncludesByEquals(array, { equals: returnFalse })).toBe(true);
    });
});

describe('toCenterGridPosition', () => {
    it('should center to grid position', () => {
        const position = toCenterGridPosition(new Vector2(101, 60));

        expect(position.x).toEqual(104);
        expect(position.y).toEqual(56);
    });
});

describe('toWorldPosition', () => {
    it('should center to grid position', () => {
        const position = toWorldPosition(new Vector2(10, 2));

        expect(position.x).toEqual(168);
        expect(position.y).toEqual(40);
    });
});

describe('toGridPosition', () => {
    it('should 0,0 when position is 8,8', () => {
        expect(toGridPosition(new Vector2(8, 8))).toMatchObject({
            x: 0,
            y: 0,
        })
    });

    it('should round down', () => {
        expect(toGridPosition(new Vector2(47, 47))).toMatchObject({
            x: 2,
            y: 2,
        })
    });
});

describe('convertPathfindingPathToPositions', () => {
    it('should convert positions', () => {
        const positions = convertPathfindingPathToPositions([
            {
                position: {
                    x: 100,
                    y: 200,
                },
            } as PathFinding.Node,
            {
                position: {
                    x: 300,
                    y: 400,
                },
            } as PathFinding.Node,
        ]);

        expect(positions).toHaveLength(2);
        expect(positions).toEqual([
            {
                x: 100,
                y: 200,
            }, {
                x: 300,
                y: 400,
            }
        ]);
    });
});
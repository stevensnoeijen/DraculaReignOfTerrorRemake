import { astar, createPathFromEndNode, getLowestFCostNode, isPositionEqual, isPositionInsideGrid, PathNode, generateAdjacentPathNodes } from './pathfinding';

describe('isPositionEqual', () => {
    it('should return false when values differ', () => {
        expect(isPositionEqual({ x: 0, y: 0 }, { x: 1, y: 1 })).toBe(false);
    });

    it('should return false when values differ in float', () => {
        expect(isPositionEqual({ x: 1.1, y: 1.1 }, { x: 1, y: 1 })).toBe(false);
    });

    it('should return true when values are the same', () => {
        expect(isPositionEqual({ x: 123, y: 123 }, { x: 123, y: 123 })).toBe(true);
    });
});

describe('getLowestFCostNode', () => {
    it('should return null when array is empty', () => {
        expect(getLowestFCostNode([])).toEqual(null);

    });

    it('should return lowest fCost node', () => {
        const randomNodes = Array.from({ length: 100 }, (value, index) => {
            const node = new PathNode(null, { x: index, y: index });
            node.fCost = Math.random() * 100 + 1;
            return node;
        });

        const lowestNode = new PathNode(null, { x: 2, y: 2 });
        lowestNode.fCost = 1;

        expect(getLowestFCostNode([...randomNodes, lowestNode])).toEqual(lowestNode);
    });
});

describe('createPathFromEndNode', () => {
    it('should return node when only one is given', () => {
        const node = new PathNode(null, { x: 1, y: 2 });

        const path = createPathFromEndNode(node);

        expect(path).toHaveLength(1);
    });

    it('should return reversed path when nodes with parents are given', () => {
        let lastNode: PathNode|null = null;
        Array.from({ length: 10 }, (value, index) => lastNode = new PathNode(lastNode, { x: index, y: index }));
        
        const path = createPathFromEndNode(lastNode!);

        expect(path).toHaveLength(10);
        expect(path.at(0)?.parent).toEqual(null);
        expect(path.at(-1)).toEqual(lastNode);
    });
});

describe('isPositionInsideGrid', () => {
    it('should return false if the grid is empty', () => {
        expect(isPositionInsideGrid([], { x: 1, y: 1 })).toBe(false);
    });

    const grid: readonly number[][] = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
    ];

    it('should return false when x is lower than 0', () => {
        expect(isPositionInsideGrid(grid, { x: -1, y: 1 })).toBe(false);
    });

    it('should return false when y is lower than 0', () => {
        expect(isPositionInsideGrid(grid, { x: 1, y: -1 })).toBe(false);
    });

    it('should return false when x is higher than the grid\'s width', () => {
        expect(isPositionInsideGrid(grid, { x: 5, y: 1 })).toBe(false);
    });

    it('should return false when y is higher than the grid\'s height', () => {
        expect(isPositionInsideGrid(grid, { x: 1, y: 5 })).toBe(false);
    });

    it('should return true when x and y is 0 and the grid has at least 1 item', () => {
        expect(isPositionInsideGrid(grid, { x: 0, y: 0 })).toBe(true);
    });

    it('should return true when x is the same as the grid\'s width', () => {
        expect(isPositionInsideGrid(grid, { x: 4, y: 0 })).toBe(true);
    });

    it('should return true when y is the same as the grid\'s height', () => {
        expect(isPositionInsideGrid(grid, { x: 0, y: 4 })).toBe(true);
    });
});

describe('generateAdjacentPathNodes', () => {
    const grid = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 1],
    ];

    it('should generate all nodes around the current node when inside the grid', () => {
        const nodes = generateAdjacentPathNodes(grid, new PathNode(null, { x: 1, y: 1 }));

        expect(nodes).toHaveLength(8);
    });

    it('should generate nodes inside the grid when at the edge of the grid', () => {
        const nodes = generateAdjacentPathNodes(grid, new PathNode(null, { x: 0, y: 0 }));

        expect(nodes).toHaveLength(3);
    });

    it('should generate all walkable nodes', () => {
        const nodes = generateAdjacentPathNodes(grid, new PathNode(null, { x: 2, y: 2 }));

        expect(nodes).toHaveLength(7);
    });
});

describe.skip('calculateDistanceCost', () => {
    // TODO: add tests
});

describe('astar', () => {   
    it('should return empty array because there is no way to the given end', () => {
        const grid = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1],
            [0, 0, 0, 1, 0],
        ];

        const start = { x: 0, y: 0 };
        const end = { x: 4, y: 4 };

        const path = astar(grid, start, end);

        expect(path).toHaveLength(0);
    });

    it('should find the way though the maze', () => {
        const grid = [
            [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];

        const start = { x: 0, y: 0 };
        const end = { x: 7, y: 6 };

        const path = astar(grid, start, end);

        expect(path).toHaveLength(8);
        expect(path[1].position).toEqual({ x: 1, y: 1 });
        // TODO: do more asserts to check the path
    });
});
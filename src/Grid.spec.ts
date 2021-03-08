import { Grid } from './Grid';
import { Vector2 } from './math/Vector2';

describe('Grid', () => {
	describe('constructor', () => {
		test('empty content', () => {
			const grid = new Grid<number>({
				width: 10,
				height: 10,
				cellSize: 16,
				originPosition: new Vector2(0, 0),
				initGridObject: (x, y) => 0,
			});

			expect(grid.width).toEqual(10);
			expect(grid.height).toEqual(10);
			expect(grid.cellSize).toEqual(16);
		});
	});
	describe('getWorldPosition', () => {
		test('simple', () => {
			const grid = new Grid<number>({
				width: 10,
				height: 10,
				cellSize: 16,
				originPosition: new Vector2(0, 0),
				initGridObject: (x, y) => 0,
			});

			expect(grid.getWorldPosition(0, 0)).toEqual({ x: 0, y: 0 });
			expect(grid.getWorldPosition(5, 2)).toEqual({ x: 5 * 16, y: 2 * 16 });
		});
		test('offset origin', () => {
			const grid = new Grid<number>({
				width: 10,
				height: 10,
				cellSize: 16,
				originPosition: new Vector2(10, 10),
				initGridObject: (x, y) => 0,
			});

			expect(grid.getWorldPosition(0, 0)).toEqual({ x: 10, y: 10 });
			expect(grid.getWorldPosition(5, 2)).toEqual({
				x: 10 + 5 * 16,
				y: 10 + 2 * 16,
			});
		});
	});
	describe('setGridObject', () => {
		test('simple', () => {
			const grid = new Grid<number>({
				width: 10,
				height: 10,
				cellSize: 16,
				originPosition: new Vector2(0, 0),
				initGridObject: (x, y) => 0,
			});
			grid.setGridObject(0, 0, 1);
		});
		test('worldPosition', () => {
			const grid = new Grid<number>({
				width: 10,
				height: 10,
				cellSize: 16,
				originPosition: new Vector2(0, 0),
				initGridObject: (x, y) => 0,
			});

			grid.setGridObject(new Vector2(0, 0), 1);
			expect(grid.getGridObject(0, 0)).toEqual(1);
		});
		test('worldPosition with offset', () => {
			const grid = new Grid<number>({
				width: 10,
				height: 10,
				cellSize: 16,
				originPosition: new Vector2(10, 10),
				initGridObject: (x, y) => 0,
			});

			grid.setGridObject(new Vector2(10, 10), 1);
			expect(grid.getGridObject(0, 0)).toEqual(1);
		});
		test('float positions', () => {
			const grid = new Grid<number>({
				width: 10,
				height: 10,
				cellSize: 16,
				originPosition: new Vector2(0, 0),
				initGridObject: (x, y) => 0,
			});

			grid.setGridObject(0.5, 0.5, 1);
			expect(grid.getGridObject(0, 0)).toEqual(0);
			expect(grid.getGridObject(1, 0)).toEqual(0);
			expect(grid.getGridObject(0, 1)).toEqual(0);
			expect(grid.getGridObject(1, 1)).toEqual(0);
		});
		test('negative positions', () => {
			const grid = new Grid<number>({
				width: 10,
				height: 10,
				cellSize: 16,
				originPosition: new Vector2(0, 0),
				initGridObject: (x, y) => 0,
			});

			grid.setGridObject(-1, -1, 1);
			expect(grid.getGridObject(0, 0)).toEqual(0);
		});
		test('larger than grid positions', () => {
			const grid = new Grid<number>({
				width: 10,
				height: 10,
				cellSize: 16,
				originPosition: new Vector2(0, 0),
				initGridObject: (x, y) => 0,
			});

			grid.setGridObject(11, 0, 1);
			expect(grid.getGridObject(9, 0)).toEqual(0);
		});
	});
	describe('getGridObject', () => {
		test('simple', () => {
			const grid = new Grid<number>({
				width: 10,
				height: 10,
				cellSize: 16,
				originPosition: new Vector2(0, 0),
				initGridObject: (x, y) => 0,
			});

			expect(grid.getGridObject(0, 0)).toEqual(0);
		});
		test('negative positions', () => {
			const grid = new Grid<number>({
				width: 10,
				height: 10,
				cellSize: 16,
				originPosition: new Vector2(0, 0),
				initGridObject: (x, y) => 0,
			});

			expect(grid.getGridObject(-1, 0)).toEqual(null);
			expect(grid.getGridObject(0, -1)).toEqual(null);
			expect(grid.getGridObject(-1, -1)).toEqual(null);
		});
		test('larger than grid positions', () => {
			const grid = new Grid<number>({
				width: 10,
				height: 10,
				cellSize: 16,
				originPosition: new Vector2(0, 0),
				initGridObject: (x, y) => 0,
			});

			expect(grid.getGridObject(10, 0)).toEqual(null);
			expect(grid.getGridObject(0, 12)).toEqual(null);
			expect(grid.getGridObject(10, 10)).toEqual(null);
		});
		test('worldPosition', () => {
			const grid = new Grid<number>({
				width: 10,
				height: 10,
				cellSize: 16,
				originPosition: new Vector2(0, 0),
				initGridObject: (x, y) => 0,
			});

			expect(grid.getGridObject(new Vector2(0, 0))).toEqual(0);
		});
		test('worldPosition with offset', () => {
			const grid = new Grid<number>({
				width: 10,
				height: 10,
				cellSize: 16,
				originPosition: new Vector2(10, 10),
				initGridObject: (x, y) => 0,
			});

			expect(grid.getGridObject(new Vector2(10, 10))).toEqual(0);
		});
	});
});

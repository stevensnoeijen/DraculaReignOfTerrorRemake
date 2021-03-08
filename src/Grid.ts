import { Debug } from './Debug';
import { EventBus } from './EventBus';
import { Vector2 } from './math/Vector2';

type BaseGridObject = { toString: () => string };

type GridObjectCreator<O> = (grid: Grid<O>, x: number, y: number) => O;

export interface GridProps<O> {
	width: number;
	height: number;
	cellSize: number;
	originPosition: Vector2;
	initGridObject: GridObjectCreator<O>;
}

export type GridChangedEvent<O extends unknown> = CustomEvent<{
	x: number;
	y: number;
	object: O;
}>;

export class Grid<O extends BaseGridObject> {
	public readonly width!: number;
	public readonly height!: number;
	public readonly cellSize!: number;
	public readonly originPosition!: Vector2;
	private readonly initGridObject!: GridObjectCreator<O>;
	public readonly eventBus: EventBus<GridChangedEvent<O>>;

	private readonly content: O[][];

	constructor(props: GridProps<O>) {
		Object.assign(this, props);
		this.eventBus = new EventBus('Grid');

		this.content = Array.from({ length: this.height }).map((yValue, y) => {
			return Array.from({ length: this.width }).map((xValue, x) =>
				this.createGridObject(x, y)
			);
		});

		if (Debug.isEnabled('grid')) {
			this.drawDebug();
		}
	}

	private createGridObject(x: number, y: number): O {
		return this.initGridObject(this, x, y);
	}

	private drawDebug(): void {
		Array.from({ length: this.height + 1 }).forEach((yValue, y) =>
			Debug.drawLine({
				start: this.getWorldPosition(0, y),
				end: this.getWorldPosition(this.width, y),
				lineColor: 'gray',
			})
		);
		Array.from({ length: this.width + 1 }).forEach((xValue, x) =>
			Debug.drawLine({
				start: this.getWorldPosition(x, 0),
				end: this.getWorldPosition(x, this.height),
				lineColor: 'gray',
			})
		);
	}

	public getPosition(worldPosition: Vector2): { x: number; y: number } {
		return {
			...Vector2.divides(
				Vector2.subtracts(worldPosition, this.originPosition),
				this.cellSize,
				'floor'
			),
		};
	}

	private checkPosition(x: number, y: number): void {
		if (!Number.isInteger(x)) {
			throw new Error(`x must be an integer, it was ${x}`);
		}
		if (!Number.isInteger(y)) {
			throw new Error(`y must be an integer, it was ${y}`);
		}
		if (x < 0 || x >= this.width) {
			throw new Error(`x must be between 0 and ${this.width}`);
		}
		if (y < 0 || y >= this.height) {
			throw new Error(`y must be between 0 and ${this.height}`);
		}
	}

	public getWorldPosition(x: number, y: number): Vector2 {
		return Vector2.adds(
			Vector2.multiplies(new Vector2(x, y), this.cellSize),
			this.originPosition
		);
	}

	static isNumber(value: unknown): value is number {
		return typeof value === 'number';
	}

	public setGridObject(x: number, y: number, gridObject: O): void;
	public setGridObject(worldPosition: Vector2, gridObject: O): void;
	public setGridObject(
		x: number | Vector2,
		y: number | O,
		gridObject?: O
	): void {
		if (x instanceof Vector2) {
			const position = this.getPosition(x);
			// move value to correct value var
			gridObject = y as O;
			x = position.x;
			y = position.y;
		}
		if (typeof x !== 'number' || typeof y !== 'number') {
			throw new Error(
				`setValue(${x}, ${y}, ${gridObject}) is called incorrectly`
			);
		}

		this.checkPosition(x, y);
		if (undefined === gridObject) {
			throw new Error('value was undefined');
		}
		this.content[y as number][x] = gridObject;
		this.eventBus.emit('gridChanged', {
			detail: {
				x: x,
				y: y,
				object: gridObject,
			},
		});
	}

	public getGridObject(x: number, y: number): O;
	public getGridObject(worldPosition: Vector2): O;
	public getGridObject(x: number | Vector2, y?: number): O {
		if (x instanceof Vector2) {
			const position = this.getPosition(x);
			x = position.x;
			y = position.y;
		}
		if (undefined === y) {
			throw new Error('y was undefined');
		}

		this.checkPosition(x, y);
		return this.content[y][x];
	}
}

import { Debug } from './Debug';
import { EventBus } from './EventBus';
import { Vector2 } from './math/Vector2';

type BaseGridObject = { toString: () => string };

type GridObjectCreator<GridObject> = (x: number, y: number) => GridObject;

export interface GridProps<GridObject> {
    width: number;
    height: number;
    cellSize: number;
    originPosition: Vector2;
    initGridObject: GridObjectCreator<GridObject>;
}

export type GridChangedEvent<GridObject> = CustomEvent<{ x: number, y: number; object: GridObject }>;

export class Grid<GridObject extends BaseGridObject> {
    public readonly width!: number;
    public readonly height!: number;
    public readonly cellSize!: number;
    public readonly originPosition!: Vector2;
    private readonly initGridObject!: GridObjectCreator<GridObject>;
    public readonly eventBus: EventBus<GridChangedEvent<GridObject>>;

    private readonly content: GridObject[][];

    constructor(props: GridProps<GridObject>) {
        Object.assign(this, props);
        this.eventBus = new EventBus('Grid');

        this.content = Array.from({ length: this.height }).map((yValue, y) => {
            return Array.from({ length: this.width }).map((xValue, x) => this.createGridObject(x, y));
        });

        if (Debug.isEnabled('grid')) {
            this.drawDebug();
        }
    }

    private createGridObject(x: number, y: number): GridObject {
        return this.initGridObject(x, y);
    }

    private drawDebug(): void {
        Array.from({ length: this.height + 1 }).forEach((yValue, y) => Debug.drawLine({
            start: this.getWorldPosition(0, y),
            end: this.getWorldPosition(this.width, y),
        }));
        Array.from({ length: this.width + 1 }).forEach((xValue, x) => Debug.drawLine({
            start: this.getWorldPosition(x, 0),
            end: this.getWorldPosition(x, this.height),
        }));
    }

    private getPosition(worldPosition: Vector2): { x: number; y: number } {
        return {
            ...Vector2.divides(Vector2.subtracts(worldPosition, this.originPosition), this.cellSize)
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
        return Vector2.adds(Vector2.multiplies(new Vector2({
            x: x,
            y: y,
        }), this.cellSize), this.originPosition);
    }

    static isNumber(value: unknown): value is number {
        return typeof value === 'number';
    }

    public setGridObject(x: number, y: number, gridObject: GridObject): void;
    public setGridObject(worldPosition: Vector2, gridObject: GridObject): void
    public setGridObject(x: number | Vector2, y: number | GridObject, gridObject?: GridObject): void {
        if (x instanceof Vector2) {
            const position = this.getPosition(x);
            // move value to correct value var
            gridObject = y as GridObject;
            x = position.x;
            y = position.y;
        }
        if (typeof x !== 'number' || typeof y !== 'number') {
            throw new Error(`setValue(${x}, ${y}, ${gridObject}) is called incorrectly`);
        }

        this.checkPosition(x, y);
        if (undefined === gridObject) {
            throw new Error('value was undefined');
        }
        this.content[y as number][x] = gridObject;
        this.eventBus.emit('gridChanged', {
            x: x,
            y: y,
            object: gridObject,
        });
    }

    public getGridObject(x: number, y: number): GridObject;
    public getGridObject(worldPosition: Vector2): GridObject;
    public getGridObject(x: number | Vector2, y?: number): GridObject {
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
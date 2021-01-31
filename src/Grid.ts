import { Debug } from './Debug';
import { Vector2 } from './math/Vector2';

export interface GridProps {
    readonly width: number;
    readonly height: number;
    readonly cellSize: number;
    readonly originPosition: Vector2;
}

export class Grid {
    public readonly width!: number;
    public readonly height!: number;
    public readonly cellSize!: number;
    public readonly originPosition!: Vector2;
    private readonly content: number[][];

    constructor(props: GridProps) {
        Object.assign(this, props);

        this.content = Array.from({ length: this.height }).map((yValue, y) => {
            return Array.from({ length: this.width }).map((xValue, x) => 0);
        });

        this.drawDebug();
    }

    private drawDebug(): void {
        Array.from({ length: this.height + 1 }).forEach((yValue, y) => Debug.drawLine({ start: this.getWorldPosition(0, y), end: this.getWorldPosition(this.width, y) }));
        Array.from({ length: this.width + 1 }).forEach((xValue, x) => Debug.drawLine({ start: this.getWorldPosition(x, 0), end: this.getWorldPosition(x, this.height) }));

        Array.from({ length: this.height }).forEach((yValue, y) => {
            Array.from({ length: this.width }).forEach((xValue, x) => {

            }, this);
        }, this);
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


    public setValue(x: number, y: number, value: number): void;
    public setValue(worldPosition: Vector2, value: number): void
    public setValue(x: number | Vector2, y: number, value?: number): void {
        if (x instanceof Vector2) {
            const position = this.getPosition(x);
            // move value to correct value var
            value = y;
            x = position.x;
            y = position.y;
        }

        this.checkPosition(x, y);
        if (undefined === value) {
            throw new Error('value was undefined');
        }
        this.content[y][x] = value;
    }

    public getValue(x: number, y: number): number;
    public getValue(worldPosition: Vector2): number;
    public getValue(x: number | Vector2, y?: number): number {
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
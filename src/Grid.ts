import { Vector2 } from './math/Vector2';

export class Grid {
    private readonly content: number[][];

    constructor(
        public readonly width: number,
        public readonly height: number,
        public readonly cellSize: number,
        public readonly originPosition: Vector2) {

        this.content = Array.from({ length: height }).map((yValue, y) => {
            return Array.from({ length: width }).map((xValue, x) => 0);
        })
    }

    public getWorldPosition(x: number, y: number): Vector2 {
        return Vector2.adds(Vector2.multiplies(new Vector2({
            x: x,
            y: y,
        }), this.cellSize), this.originPosition);
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
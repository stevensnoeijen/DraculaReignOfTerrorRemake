import { Vector2 } from '../Vector2';

/**
 * Represents an axis aligned bounding box.
 */
export class Bounds {
    /**
     * Extend size from the center.
     * Its half of {@link size}.
     */
    public readonly extends: Vector2;

    /**
     * This is always equal to center-extents.
     */
    public readonly min: Vector2;

    /**
     * This is always equal to center+extents.
     */
    public readonly max: Vector2;

    constructor(public readonly center: Vector2,
        public readonly size: Vector2) {
        this.extends = new Vector2({
            x: size.x / 2,
            y: size.y / 2,
        });
        this.min = Vector2.subtracts(this.center, this.extends);
        this.max = Vector2.adds(this.center, this.extends);
    }

    public contains(point: Vector2): boolean {
        return (
            point.x >= this.min.x &&
            point.x <= this.max.x &&
            point.y >= this.min.y &&
            point.y <= this.max.y
        );
    }
}
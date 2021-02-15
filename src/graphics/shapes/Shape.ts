import { Vector2 } from '../../math/Vector2';

export interface IShapeProps {
    lineWidth?: number;
    position?: Vector2;
}

const defaultShapeProps: Partial<IShapeProps> = {
    position: Vector2.ZERO,
}

export abstract class Shape {
    /**
     * Position (origin) where the shape is drawn from
     */
    public position!: Vector2;
    public lineWidth!: number | null;

    constructor(props: IShapeProps) {
        Object.assign(this, defaultShapeProps, props);
    }
}
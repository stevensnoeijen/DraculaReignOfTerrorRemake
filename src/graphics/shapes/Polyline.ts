import { Vector2 } from '../../math/Vector2';
import { IPolylineBuilderProps, PolylineBuilder } from './PolylineBuilder';
import { Shape, IShapeProps } from './Shape';

export interface IPolylineProps extends IShapeProps {
    points: Vector2[];
    closePath?: boolean;
    fillStyle?: string;
    lineWidth?: number;
    lineStyle?: string;
}

const defaultProps: Partial<IPolylineProps> = {
    closePath: false,
    fillStyle: null,
    lineStyle: null,
    lineWidth: 0,
}

export class Polyline extends Shape {
    public readonly points!: Vector2[];
    public closed = false;
    public fillStyle!: string | null;
    public lineWidth!: number;
    public lineStyle!: string | null;

    constructor(props: IPolylineProps) {
        super(props);
        Object.assign(this, defaultProps, props);
    }

    public static builder(props: IPolylineBuilderProps): PolylineBuilder {
        return new PolylineBuilder(props);
    }
}
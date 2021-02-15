import { Vector2 } from '../../math/Vector2';
import { Optional } from '../../Optional';
import { Polyline, IPolylineProps } from './Polyline';

export interface IPolylineBuilderProps extends Optional<IPolylineProps, 'points' | 'closed'> { }

const defaultProps: Partial<IPolylineBuilderProps> = {
    closed: false,
}

export class PolylineBuilder {
    private props: IPolylineBuilderProps;

    constructor(props: IPolylineBuilderProps) {
        this.props = Object.assign({}, props, defaultProps);
        this.props.points = [];
    }

    public addPoint(vertex: Vector2): this {
        this.props.points!.push(vertex);
        return this;
    }

    public closed(): this {
        this.props.closed = true;
        return this;
    }

    public build(): Polyline {
        return new Polyline(this.props!);
    }
}
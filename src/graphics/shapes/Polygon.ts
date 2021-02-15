import { IPolylineProps, Polyline } from './Polyline';

type IPolygonProps = Omit<IPolylineProps, 'closed'>;

const defaultProp: Pick<IPolylineProps, 'closed'> = {
    closed: true,
}

export class Polygon extends Polyline {
    constructor(props: IPolygonProps) {
        super({
            ...defaultProp,
            ...props,
        });
    }
}
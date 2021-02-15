import { Vector2 } from '../../math/Vector2';
import { Polyline } from './Polyline';

export class ShapeFactory {
    public static triangle(size: number): Polyline {
        const half = size / 2;

        return Polyline.builder({})
            .addPoint(new Vector2({
                x: -half,
                y: -half
            }))
            .addPoint(new Vector2({
                x: half,
                y: -half,
            }))
            .addPoint(new Vector2({
                x: 0,
                y: half,
            }))
            .setPolygon()
            .build();
    }
}
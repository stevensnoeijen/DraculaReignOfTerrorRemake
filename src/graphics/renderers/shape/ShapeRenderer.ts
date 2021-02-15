import { Arc } from '../../shapes/Arc';
import { Circle } from '../../shapes/Circle';
import { Line } from '../../shapes/Line';
import { Polyline } from '../../shapes/Polyline';
import { Rectangle } from '../../shapes/Rectangle';
import { Shape } from '../../shapes/Shape';
import { IRenderer } from '../IRenderer';
import { ArcRenderer } from './ArcRenderer';
import { LineRenderer } from './LineRenderer';
import { PolylineRenderer } from './PolylineRenderer';
import { RectangleRenderer } from './RectangleRenderer';

/**
 * Facade class for all shapes to be rendered
 */
export class ShapeRenderer implements IRenderer<Shape> {
    private readonly ractangleRenderer: RectangleRenderer;
    private readonly arcRenderer: ArcRenderer;
    private readonly polylineRenderer: PolylineRenderer;
    private readonly lineRenderer: LineRenderer;

    constructor(private readonly context: CanvasRenderingContext2D) {
        this.ractangleRenderer = new RectangleRenderer(this.context);
        this.arcRenderer = new ArcRenderer(this.context);
        this.polylineRenderer = new PolylineRenderer(this.context);
        this.lineRenderer = new LineRenderer(this.context);
    }

    public render(shape: Shape): void {
        if (shape instanceof Rectangle) {
            this.ractangleRenderer.render(shape);

            return;
        }
        if (shape instanceof Arc || shape instanceof Circle) {
            this.arcRenderer.render(shape);

            return;
        }
        if (shape instanceof Polyline) {
            this.polylineRenderer.render(shape);

            return;
        }
        if (shape instanceof Line) {
            this.lineRenderer.render(shape);

            return;
        }
    }

}
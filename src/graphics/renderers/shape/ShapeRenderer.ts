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

type RendererByShape = {
    shape: typeof Shape;
    renderer: IRenderer<Shape>;
};

/**
 * Facade class for all shapes to be rendered
 */
export class ShapeRenderer implements IRenderer<Shape> {
    private readonly shapeRenderers: RendererByShape[] = [];

    constructor(private readonly context: CanvasRenderingContext2D) {
        this.shapeRenderers.push({
            shape: Rectangle,
            renderer: new RectangleRenderer(this.context),
        });
        const arcRenderer = new ArcRenderer(this.context);
        this.shapeRenderers.push({
            shape: Arc,
            renderer: arcRenderer,
        });
        this.shapeRenderers.push({
            shape: Circle,
            renderer: arcRenderer,
        });
        this.shapeRenderers.push({
            shape: Polyline,
            renderer: new PolylineRenderer(this.context),
        });
        this.shapeRenderers.push({
            shape: Line,
            renderer: new LineRenderer(this.context),
        });
    }

    private getRendererByShape(shape: Shape): IRenderer<Shape> | null {
        const shapeRenderer = this.shapeRenderers.find((shapeRenderer) => shape instanceof shapeRenderer.shape);
        if (!shapeRenderer) {
            return null;
        }

        return shapeRenderer.renderer;
    }

    public render(shape: Shape): void {
        const renderer = this.getRendererByShape(shape);
        if (renderer) {
            renderer.render(shape);
        }
    }

}
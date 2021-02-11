import { Shape } from '../../shapes/Shape';
import { IRenderer } from '../IRenderer';

export abstract class AbstractShapeRenderer<TShape extends Shape> implements IRenderer<Shape> {
    constructor(protected readonly context: CanvasRenderingContext2D) { }

    public render(shape: TShape): void {
        this.context.translate(shape.position.x, shape.position.y);
    }
}
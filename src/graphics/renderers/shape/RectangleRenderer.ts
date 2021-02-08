import { Rectangle } from '../../shapes/Rectangle';
import { IRenderer } from '../IRenderer';

export class RectangleRenderer implements IRenderer<Rectangle> {
    constructor(private readonly context: CanvasRenderingContext2D) { }

    public render(rectangle: Rectangle): void {
        const x = rectangle.renderOrigin === 'topleft' ? 0 : -(rectangle.size.width / 2);
        const y = rectangle.renderOrigin === 'topleft' ? 0 : -(rectangle.size.height / 2);

        this.context.rect(x, y, rectangle.size.width, rectangle.size.height);
        if (rectangle.fillStyle) {
            this.context.fillStyle = rectangle.fillStyle.toString();
            this.context.fill();
        }

        if (rectangle.lineWidth && rectangle.lineWidth > 0) {
            this.context.lineWidth = rectangle.lineWidth;
            this.context.strokeStyle = rectangle.lineStyle?.toString() || '#000';
            this.context.stroke();
        }
    }
}
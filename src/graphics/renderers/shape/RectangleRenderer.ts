import { Rectangle } from '../../shapes/Rectangle';
import { ShapeRenderer } from './ShapeRenderer';

export class RectangleRenderer extends ShapeRenderer<Rectangle> {
    public render(rectangle: Rectangle): void {
        super.render(rectangle);

        // TODO: move to ShapeRenderer
        const x = rectangle.anchor === 'top-left' ? 0 : -(rectangle.size.width / 2);
        const y = rectangle.anchor === 'top-left' ? 0 : -(rectangle.size.height / 2);

        this.context.beginPath();
        this.context.rect(x, y, rectangle.size.width, rectangle.size.height);
        this.context.closePath();
        if (rectangle.fillStyle) {
            this.context.fillStyle = rectangle.fillStyle.toString();
            this.context.fill();
        }

        if (rectangle.lineWidth > 0) {
            this.context.lineWidth = rectangle.lineWidth;
            this.context.strokeStyle = rectangle.lineStyle?.toString() || '#000';
            this.context.stroke();
        }
    }
}
import { Polyline } from '../../shapes/Polyline';
import { AbstractShapeRenderer } from './AbstractShapeRenderer';

export class PolylineRenderer extends AbstractShapeRenderer<Polyline> {
    public render(polyline: Polyline): void {
        super.render(polyline);

        this.context.beginPath();
        for (const vertex of polyline.points) {
            this.context.lineTo(vertex.x, vertex.y);
        }
        if (polyline.closed) {
            this.context.closePath();
        }

        if (null !== polyline.fillStyle) {
            this.context.fillStyle = polyline.fillStyle;
            this.context.fill();
        }

        if (polyline.lineWidth > 0) {
            this.context.lineWidth = polyline.lineWidth;
            this.context.strokeStyle = polyline.lineStyle || '#000';
            this.context.stroke();
        }
    }
}
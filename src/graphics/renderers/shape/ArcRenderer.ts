
import { Arc } from '../../shapes/Arc';
import { AbstractShapeRenderer } from './AbstractShapeRenderer';

/**
 * Renders {@link Arc} and {@link Circle}
 */
export class ArcRenderer extends AbstractShapeRenderer<Arc> {
    public render(arc: Arc): void {
        super.render(arc);

        this.context.beginPath();
        this.context.arc(0, 0, arc.radius, arc.startAngle, arc.endAngle);

        if (arc.fillStyle) {
            this.context.fillStyle = arc.fillStyle;
            this.context.fill();
        }

        if (arc.strokeStyle && arc.lineWidth) {
            this.context.lineWidth = arc.lineWidth;
            this.context.strokeStyle = arc.strokeStyle;
            this.context.stroke();
        }
    }
}
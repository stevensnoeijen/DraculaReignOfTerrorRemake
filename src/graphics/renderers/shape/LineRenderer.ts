import { Line } from '../../shapes/Line';
import { AbstractShapeRenderer } from './AbstractShapeRenderer';

export class LineRenderer extends AbstractShapeRenderer<Line> {
    public render(line: Line): void {
        super.render(line);

        this.context.strokeStyle = line.lineColor.toString();
        this.context.lineWidth = line.lineWidth;
        this.context.beginPath();
        this.context.moveTo(line.start.x, line.start.y);
        this.context.lineTo(line.end.x, line.end.y);
        this.context.closePath();
        this.context.stroke();
    }
}
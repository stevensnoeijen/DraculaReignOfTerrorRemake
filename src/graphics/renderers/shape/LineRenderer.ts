import { Line } from '../../shapes/Line';
import { ShapeRenderer } from './ShapeRenderer';

export class LineRenderer extends ShapeRenderer<Line> {
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
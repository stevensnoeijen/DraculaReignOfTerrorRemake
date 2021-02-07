import { Line } from '../../shapes/Line';
import { IRenderer } from '../IRenderer';

export class LineRenderer implements IRenderer<Line> {
    constructor(private readonly context: CanvasRenderingContext2D) { }

    public render(line: Line): void {
        this.context.strokeStyle = line.lineColor.toString();
        this.context.lineWidth = line.lineWidth;
        this.context.beginPath();
        this.context.moveTo(line.start.x, line.start.y);
        this.context.lineTo(line.end.x, line.end.y);
        this.context.closePath();
        this.context.stroke();
    }
}
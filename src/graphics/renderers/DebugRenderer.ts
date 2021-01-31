import { Entity } from 'ecsy';
import { IRenderer } from './IRenderer';
import { Debug } from '../../Debug';
import { Line } from '../shapes/Line';

export class DebugRenderer implements IRenderer {
    constructor(private readonly context: CanvasRenderingContext2D) { }

    public render(entity: Entity): void {
        for (const shape of Debug.shapes) {
            if (shape instanceof Line) {
                this.renderLine(shape);
            }
        }
    }

    private renderLine(line: Line): void {
        this.context.strokeStyle = line.lineColor.toString();
        this.context.lineWidth = line.lineWidth;
        this.context.beginPath();
        this.context.moveTo(line.start.x, line.start.y);
        this.context.lineTo(line.end.x, line.end.y);
        this.context.closePath();
        this.context.stroke();
    }
}
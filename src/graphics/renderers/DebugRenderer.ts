import { Entity } from 'ecsy';
import { IRenderer } from './IRenderer';
import { Debug } from '../../Debug';
import { Line } from '../shapes/Line';
import { Text } from '../Text';

export class DebugRenderer implements IRenderer {
    constructor(private readonly context: CanvasRenderingContext2D) { }

    public render(entity: Entity): void {
        for (const shape of Debug.shapes) {
            if (shape instanceof Line) {
                this.renderLine(shape);
            }
        }
        for (const text of Debug.texts) {
            this.renderText(text);
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

    private renderText(text: Text): void {
        this.context.font = text.font;
        this.context.fillStyle = text.color.toString();
        this.context.textAlign = text.align;
        this.context.textBaseline = text.baseline;
        this.context.fillText(text.text, text.position.x, text.position.y);
    }
}
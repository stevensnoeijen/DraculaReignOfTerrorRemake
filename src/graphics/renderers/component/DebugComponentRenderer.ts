import { Entity } from 'ecsy';
import { Debug } from '../../../Debug';
import { Line } from '../../shapes/Line';
import { IComponentRenderer } from '../IComponentRenderer';
import { LineRenderer } from '../shape/LineRenderer';
import { TextRenderer } from '../shape/TextRenderer';

export class DebugComponentRenderer implements IComponentRenderer {
    private readonly textRenderer: TextRenderer;
    private readonly lineRenderer: LineRenderer;

    constructor(private readonly context: CanvasRenderingContext2D) {
        this.textRenderer = new TextRenderer(context);
        this.lineRenderer = new LineRenderer(context);
    }

    public render(entity: Entity): void {
        for (const shape of Debug.shapes) {
            if (shape instanceof Line) {
                this.lineRenderer.render(shape);
            }
        }
        for (const text of Debug.texts) {
            this.textRenderer.render(text);
        }
    }
}
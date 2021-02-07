import { Entity } from 'ecsy';
import { IRenderer } from './IRenderer';
import { Line } from '../shapes/Line';
import { Text } from '../Text';
import { GridComponent } from '../../components/GridComponent';
import { GridViewComponent } from '../../components/GridViewComponent';

export class GridViewRenderer implements IRenderer {
    private texts: Text[][] = [];

    constructor(private readonly context: CanvasRenderingContext2D) { }

    public render(entity: Entity): void {
        const gridComponent = entity.getComponent(GridComponent);
        if (!gridComponent) {
            return;
        }
        const grid = gridComponent.grid;
        const viewComponent = entity.getComponent(GridViewComponent);
        if (!viewComponent) {
            return;
        }
        const view = viewComponent.view;

        for (let y = 0; y < grid.height; y++) {
            for (let x = 0; x < grid.width; x++) {
                const text = view.getView(x, y);
                this.renderText(text);
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

    private renderText(text: Text): void {
        this.context.font = text.font;
        this.context.fillStyle = text.color.toString();
        this.context.textAlign = text.align;
        this.context.textBaseline = text.baseline;
        this.context.fillText(text.text, text.position.x, text.position.y);
    }
}
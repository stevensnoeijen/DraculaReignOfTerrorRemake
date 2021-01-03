import { Entity } from 'ecsy';
import { PositionComponent } from '../components/PositionComponent';
import { SelectableComponent } from '../components/SelectableComponent';
import { SizeComponent } from '../components/SizeComponent';
import { IRenderer } from './IRenderer';

export class SelectionRenderer implements IRenderer {

    private static readonly OFFSET = 2;

    constructor(private readonly context: CanvasRenderingContext2D) { }

    public render(entity: Entity): void {
        const selectable = entity.getComponent(SelectableComponent);
        if (!selectable || !selectable.selected) {
            return;
        }

        const position = entity.getComponent(PositionComponent);
        if (!position) {
            return;
        }
        const size = entity.getComponent(SizeComponent);
        if (!size) {
            return;
        }

        this.context.beginPath();

        this.context.rect(position.x - SelectionRenderer.OFFSET, position.y - SelectionRenderer.OFFSET, size.width + (SelectionRenderer.OFFSET * 2), size.height + (SelectionRenderer.OFFSET * 2));

        this.context.lineWidth = 1;
        this.context.strokeStyle = '#000';
        this.context.stroke();
    }

}
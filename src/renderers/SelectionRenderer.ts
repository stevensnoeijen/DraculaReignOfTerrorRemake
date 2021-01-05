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

        this.context.translate(position.x, position.y);

        this.context.lineWidth = 1;
        this.context.strokeStyle = '#000';
        this.context.lineCap = 'square';
        this.context.lineJoin = 'round';

        const left = -(size.width / 2);
        const top = -(size.height / 2);

        this.context.beginPath();
        // top left corner
        this.context.moveTo(left - SelectionRenderer.OFFSET, top + 2);// bottom left
        this.context.lineTo(left - SelectionRenderer.OFFSET, top - SelectionRenderer.OFFSET);// left top
        this.context.lineTo(left + 2, top - SelectionRenderer.OFFSET);// right
        this.context.stroke();

        this.context.beginPath();
        // top right corner
        this.context.moveTo(left + size.width + SelectionRenderer.OFFSET, top + 2);// bottom right
        this.context.lineTo(left + size.width + SelectionRenderer.OFFSET, top - SelectionRenderer.OFFSET);// right top
        this.context.lineTo(left + size.width - 2, top - SelectionRenderer.OFFSET);// left
        this.context.stroke();

        this.context.setTransform(1, 0, 0, 1, 0, 0);// reset transform
    }

}
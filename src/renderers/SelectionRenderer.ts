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

        this.context.lineWidth = 1;
        this.context.strokeStyle = '#000';
        this.context.lineCap = 'square';
        this.context.lineJoin = 'round';

        this.context.beginPath();

        // top left corner
        this.context.moveTo(position.x - SelectionRenderer.OFFSET, position.y + 2);// bottom left
        this.context.lineTo(position.x - SelectionRenderer.OFFSET, position.y - SelectionRenderer.OFFSET);// left top
        this.context.lineTo(position.x + 2, position.y - SelectionRenderer.OFFSET);// right

        this.context.stroke();

        this.context.beginPath();

        // top right corner
        this.context.moveTo(position.x + size.width + SelectionRenderer.OFFSET, position.y + 2);// bottom right
        this.context.lineTo(position.x + size.width + SelectionRenderer.OFFSET, position.y - SelectionRenderer.OFFSET);// right top
        this.context.lineTo(position.x + size.width - 2, position.y - SelectionRenderer.OFFSET);// left

        this.context.stroke();
    }

}
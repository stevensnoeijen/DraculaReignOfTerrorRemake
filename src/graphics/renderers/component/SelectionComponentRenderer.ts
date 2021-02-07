import { Entity } from 'ecsy';
import { TransformComponent } from '../../../components/TransformComponent';
import { SelectableComponent } from '../../../components/SelectableComponent';
import { SizeComponent } from '../../../components/SizeComponent';
import { IEntityRenderer } from '../IEntityRenderer';

export class SelectionComponentRenderer implements IEntityRenderer {

    private static readonly OFFSET = 2;

    constructor(private readonly context: CanvasRenderingContext2D) { }

    public render(entity: Entity): void {
        const selectable = entity.getComponent(SelectableComponent);
        if (!selectable || !selectable.selected) {
            return;
        }

        const transform = entity.getComponent(TransformComponent);
        if (!transform) {
            return;
        }
        const size = entity.getComponent(SizeComponent);
        if (!size) {
            return;
        }

        this.context.translate(transform.position.x, transform.position.y);

        this.context.lineWidth = 1;
        this.context.strokeStyle = '#000';
        this.context.lineCap = 'square';
        this.context.lineJoin = 'round';

        const left = -(size.width / 2);
        const top = -(size.height / 2);

        this.context.beginPath();
        // top left corner
        this.context.moveTo(left - SelectionComponentRenderer.OFFSET, top + 2);// bottom left
        this.context.lineTo(left - SelectionComponentRenderer.OFFSET, top - SelectionComponentRenderer.OFFSET);// left top
        this.context.lineTo(left + 2, top - SelectionComponentRenderer.OFFSET);// right
        this.context.stroke();

        this.context.beginPath();
        // top right corner
        this.context.moveTo(left + size.width + SelectionComponentRenderer.OFFSET, top + 2);// bottom right
        this.context.lineTo(left + size.width + SelectionComponentRenderer.OFFSET, top - SelectionComponentRenderer.OFFSET);// right top
        this.context.lineTo(left + size.width - 2, top - SelectionComponentRenderer.OFFSET);// left
        this.context.stroke();

        this.context.setTransform(1, 0, 0, 1, 0, 0);// reset transform
    }

}
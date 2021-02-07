import { Entity } from 'ecsy';
import { GridComponent } from '../../../components/GridComponent';
import { GridViewComponent } from '../../../components/GridViewComponent';
import { IEntityRenderer } from '../IEntityRenderer';
import { TextRenderer } from '../shape/TextRenderer';

export class GridViewComponentRenderer implements IEntityRenderer {
    private readonly textRenderer: TextRenderer;

    constructor(private readonly context: CanvasRenderingContext2D) {
        this.textRenderer = new TextRenderer(context);
    }

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
                this.textRenderer.render(text);
            }
        }
    }
}
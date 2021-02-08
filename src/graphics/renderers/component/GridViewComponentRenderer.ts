import { Entity } from 'ecsy';
import { GridComponent } from '../../../components/GridComponent';
import { GridViewComponent } from '../../../components/GridViewComponent';
import { Debug } from '../../../Debug';
import { IComponentRenderer } from '../IComponentRenderer';
import { TextRenderer } from '../shape/TextRenderer';

export class GridViewComponentRenderer implements IComponentRenderer {
    private readonly textRenderer: TextRenderer;

    constructor(private readonly context: CanvasRenderingContext2D) {
        this.textRenderer = new TextRenderer(context);
    }

    public render(entity: Entity): void {
        if (!Debug.isEnabled('gridview')) {
            return;
        }

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
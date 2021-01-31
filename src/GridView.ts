import { Debug } from './Debug';
import { Grid, GridChangedEvent } from './Grid';
import { Vector2 } from './math/Vector2';

export class GridView {
    private debugTexts: Text[][] = [];

    constructor(private readonly grid: Grid<number>) {

        Array.from({ length: this.grid.height }).forEach((yValue, y) => {
            this.debugTexts[y] = [];
            Array.from({ length: this.grid.width }).forEach((xValue, x) => {
                const text = Debug.drawText({
                    position: Vector2.adds(this.grid.getWorldPosition(x, y), new Vector2({ x: this.grid.cellSize / 2, y: this.grid.cellSize / 2, })),
                    text: '' + this.grid.getGridObject(x, y),
                });
                if (null !== text) {
                    this.debugTexts![y][x] = text;
                }
            }, this);
        }, this);


        grid.eventBus.on('gridChanged', (event: GridChangedEvent<number>) => {
            this.debugTexts[event.detail.y][event.detail.x]!.text = event.detail.object.toString();
        });
    }
}
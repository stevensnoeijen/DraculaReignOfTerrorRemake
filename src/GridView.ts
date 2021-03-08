import { Text } from './graphics/Text';
import { Grid, GridChangedEvent } from './Grid';
import { Vector2 } from './math/Vector2';

export class GridView<GridObject> {
	private texts: Text[][] = [];

	constructor(private readonly grid: Grid<GridObject>) {
		Array.from({ length: this.grid.height }).forEach((yValue, y) => {
			this.texts[y] = [];
			Array.from({ length: this.grid.width }).forEach((xValue, x) => {
				const text = new Text({
					position: Vector2.adds(
						this.grid.getWorldPosition(x, y),
						new Vector2(this.grid.cellSize / 2, this.grid.cellSize / 2)
					),
					text: this.grid.getGridObject(x, y).toString(),
					font: '6px Arial',
					color: 'green',
				});
				this.texts[y][x] = text;
			}, this);
		}, this);

		grid.eventBus.on('gridChanged', (event: GridChangedEvent<GridObject>) => {
			this.texts[event.detail.y][
				event.detail.x
			].text = event.detail.object.toString();
		});
	}

	public getView(x: number, y: number): Text {
		return this.texts[y][x];
	}
}

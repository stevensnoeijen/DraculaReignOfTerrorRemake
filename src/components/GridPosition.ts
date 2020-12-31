import { Component, Types } from 'ecsy';

interface IGridPositionOptions {
	layer: number;
}

export class GridPosition extends Component<IGridPositionOptions> {
	public row?: number;
	public column?: number;
}

GridPosition.schema = {
	row: { type: Types.Number },
	column: { type: Types.Number },
};

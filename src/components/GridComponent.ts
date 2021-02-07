import { Component, Types } from 'ecsy';
import { Grid } from '../Grid';

export interface IGridComponentProps<GridObject> {
    grid: Grid<GridObject>;
}

export class GridComponent<GridObject> extends Component<IGridComponentProps<GridObject>> {
    grid: Grid<GridObject>;
}

GridComponent.schema = {
    grid: { type: Types.Ref },
};

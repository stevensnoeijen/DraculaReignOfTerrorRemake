import { Component, Types } from 'ecsy';
import { GridView } from '../GridView';

export interface IGridViewComponentProps {
    view: GridView;
}

export class GridViewComponent extends Component<IGridViewComponentProps> {
    declare view: GridView;
}

GridViewComponent.schema = {
    view: { type: Types.Ref },
};

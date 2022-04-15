import { Component, Types } from 'ecsy';
import { Shape } from '../graphics/shapes/Shape';

interface IShapeComponentProps<Shape> {
	shape: Shape;
}

export class ShapeComponent extends Component<IShapeComponentProps<unknown>> {
	shape!: Shape;
}

ShapeComponent.schema = {
	shape: { type: Types.Ref },
};

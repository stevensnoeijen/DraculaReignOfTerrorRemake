import { Component, Types } from 'ecsy';
import { IShape } from '../graphics/shapes/IShape';

interface IShapeComponentProps<Shape> {
	shape: Shape;
}

export class ShapeComponent<Shape extends IShape = IShape> extends Component<IShapeComponentProps<Shape>> {
	shape: Shape;
}

ShapeComponent.schema = {
	shape: { type: Types.Ref },
};

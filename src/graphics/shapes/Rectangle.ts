import { Color } from '../Color';
import { ISize } from '../ISize';
import { Shape, IShapeProps } from './Shape';

type Anchor = 'middle-center' | 'top-left';

interface IRectangleProps extends IShapeProps {
	size: ISize;
	fillStyle?: Color | null;
	lineWidth?: number;
	lineStyle?: Color | null;
	anchor: Anchor;
}

const defaultProps: Partial<IRectangleProps> = Object.seal({
	fillStyle: null,
	lineStyle: null,
});

export class Rectangle extends Shape {
	public size!: ISize;
	public fillStyle!: Color | null;
	public lineWidth!: number;
	public lineStyle!: Color | null;

	public anchor!: Anchor;

	constructor(props: IRectangleProps) {
		super(props);
		Object.assign(this, defaultProps, props);
	}
}

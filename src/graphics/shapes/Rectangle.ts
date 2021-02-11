import Color from 'color';
import { ISize } from '../ISize';
import { Shape, IShapeProps } from './Shape';

type Anchor = 'middle-center' | 'top-left';

interface IRectangleProps extends IShapeProps {
    size: ISize;
    fillStyle?: Color;
    lineWidth?: number;
    lineStyle?: Color;
    anchor: Anchor
}

export class Rectangle extends Shape {
    public size!: ISize;
    public fillStyle!: Color | null;
    public lineWidth!: number;
    public lineStyle!: Color | null;
    public anchor!: Anchor;

    constructor(props: IRectangleProps) {
        super(props);
    }
}
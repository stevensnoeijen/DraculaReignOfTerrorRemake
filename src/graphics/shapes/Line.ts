import Color from 'color';
import { Vector2 } from '../../math/Vector2';
import { IShapeProps, Shape } from './Shape';

export interface ILineProps extends IShapeProps {
    start: Vector2;
    end: Vector2;
    lineColor: Color<string>;
    lineWidth: number;
}

export class Line extends Shape {
    public start!: Vector2;
    public end!: Vector2;
    public lineColor!: Color<string>;
    public lineWidth!: number;

    constructor(props: ILineProps) {
        super(props);
    }
}

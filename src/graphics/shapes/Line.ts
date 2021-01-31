import Color from 'color';
import { Vector2 } from '../../math/Vector2';
import { Shape } from './Shape';

export interface ILineProps {
    start: Vector2;
    end: Vector2;
    lineColor: Color<string>;
    lineWidth: number;
}

export class Line extends Shape {
    public readonly start!: Vector2;
    public readonly end!: Vector2;
    public readonly lineColor!: Color<string>;
    public readonly lineWidth!: number;

    constructor(props: ILineProps) {
        super();
        Object.assign(this, props);
    }
}

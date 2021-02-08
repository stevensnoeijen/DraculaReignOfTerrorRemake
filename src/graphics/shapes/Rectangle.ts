import Color from 'color';
import { Vector2 } from '../../math/Vector2';
import { IPosition } from '../IPosition';
import { ISize } from '../ISize';
import { IShape } from './IShape';

interface IRectangleProps {
    position?: IPosition;
    size: ISize;
    fillStyle?: Color;
    lineWidth?: number;
    lineStyle?: Color;
    renderOrigin: 'center' | 'topleft';// TODO: change this to anchor
}

const defaultRectangleProps: Partial<IRectangleProps> = {
    position: Vector2.ZERO,
}

export class Rectangle implements IShape {
    public position!: IPosition;
    public size!: ISize;
    public readonly fillStyle!: Color | null;
    public readonly lineWidth!: number;
    public readonly lineStyle!: Color | null;
    public readonly renderOrigin!: 'center' | 'topleft';

    constructor(props: IRectangleProps) {
        Object.assign(this, defaultRectangleProps, props);
    }
}
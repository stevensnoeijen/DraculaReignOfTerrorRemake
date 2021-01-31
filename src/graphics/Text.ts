import Color from 'color';
import { Vector2 } from '../math/Vector2';

export interface ITextProps {
    position: Vector2;
    text: string;
    font: string;
    color: Color;
    align?: CanvasTextAlign;
    baseline?: CanvasTextBaseline;
}

const defaultProps: Partial<ITextProps> = {
    align: 'center',
    baseline: 'middle',
}

export class Text {
    public position!: Vector2;
    public text!: string;
    public font!: string;
    public color!: Color;
    public align!: CanvasTextAlign;
    public baseline!: CanvasTextBaseline;

    constructor(props: ITextProps) {
        Object.assign(this, defaultProps, props);
    }
}
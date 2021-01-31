import { Shape } from './graphics/shapes/Shape';
import { ILineProps, Line } from './graphics/shapes/Line';
import { Colors } from './graphics/Colors';
import { Optional } from './Optional';
import { ITextProps, Text } from './graphics/Text';

export class Debug {
    public static readonly DEFAULTS = {
        line: {
            lineColor: Colors.WHITE,
            lineWidth: 1,
        },
        text: {
            font: '10px Arial',
            color: Colors.WHITE
        }
    };

    public static readonly shapes: Shape[] = [];
    public static readonly texts: Text[] = [];

    public static drawLine(props: Optional<ILineProps, 'lineColor' | 'lineWidth'>): void {
        props = Object.assign({
            ...this.DEFAULTS.line,
        }, props);
        this.shapes.push(new Line(props as ILineProps));
    }

    public static drawText(props: Optional<ITextProps, 'font' | 'color'>): void {
        props = Object.assign({
            ...this.DEFAULTS.text,
        }, props);
        this.texts.push(new Text(props as ITextProps));
    }
}
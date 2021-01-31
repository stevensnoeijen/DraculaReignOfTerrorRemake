import { Shape } from './graphics/shapes/Shape';
import { ILineProps, Line } from './graphics/shapes/Line';
import { Colors } from './graphics/Colors';
import { Optional } from './Optional';

export class Debug {
    public static readonly DEFAULTS = {
        line: {
            lineColor: Colors.WHITE,
            lineWidth: 1,
        }
    };

    public static readonly shapes: Shape[] = [];

    public static drawLine(lineProps: Optional<ILineProps, 'lineColor' | 'lineWidth'>): void {
        lineProps = Object.assign({
            ...this.DEFAULTS.line,
        }, lineProps);
        this.shapes.push(new Line(lineProps as ILineProps));
    }
}
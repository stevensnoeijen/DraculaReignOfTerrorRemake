import { IShape } from './graphics/shapes/IShape';
import { ILineProps, Line } from './graphics/shapes/Line';
import { Colors } from './graphics/Colors';
import { Optional } from './Optional';
import { ITextProps, Text } from './graphics/Text';

export class Debug {
    public static readonly DEFAULTS = {
        shapes: {
            line: {
                lineColor: Colors.WHITE,
                lineWidth: 1,
            },
        },
        text: {
            font: '10px Arial',
            color: Colors.WHITE,
        }
    };
    public static options: string[] = [];
    public static readonly shapes: IShape[] = [];
    public static readonly texts: Text[] = [];

    public static isEnabled(option: string): boolean {
        if (this.options.includes('all')) {
            return true;
        }

        return this.options.includes(option);
    }

    public static drawLine(props: Optional<ILineProps, 'lineColor' | 'lineWidth'>): Line | null {
        if (!this.isEnabled('line')) {
            return null;
        }

        props = Object.assign({
            ...this.DEFAULTS.shapes.line,
        }, props);
        const line = new Line(props as ILineProps);
        this.shapes.push(line);

        return line;
    }

    public static drawText(props: Optional<ITextProps, 'font' | 'color'>): Text | null {
        if (!this.isEnabled('text')) {
            return null;
        }

        props = Object.assign({
            ...this.DEFAULTS.text,
        }, props);
        const text = new Text(props as ITextProps);
        this.texts.push(text);

        return text;
    }
}
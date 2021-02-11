import { Text } from '../../Text';
import { IRenderer } from '../IRenderer';

export class TextRenderer implements IRenderer<Text> {
    constructor(private readonly context: CanvasRenderingContext2D) { }

    public render(text: Text): void {
        this.context.translate(text.position.x, text.position.y);

        this.context.font = text.font;
        this.context.fillStyle = text.color.toString();
        this.context.textAlign = text.align;
        this.context.textBaseline = text.baseline;
        this.context.fillText(text.text, 0, 0);
    }
}
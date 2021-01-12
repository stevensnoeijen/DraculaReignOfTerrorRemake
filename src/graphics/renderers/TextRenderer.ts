import { Entity } from 'ecsy';
import { PositionComponent } from '../../components/PositionComponent';
import { TextComponent } from '../../components/TextComponent';
import { IRenderer } from './IRenderer';

export class TextRenderer implements IRenderer {
	constructor(private readonly context: CanvasRenderingContext2D) { }

	public render(entity: Entity): void {
		const text = entity.getComponent(TextComponent)!;
		const position = entity.getComponent(PositionComponent)!;

		this.context.font = text.font;
		this.context.fillStyle = text.color;
		this.context.fillText(text.text, position.x, position.y);
	}
}

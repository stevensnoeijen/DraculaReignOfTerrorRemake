import { Entity } from 'ecsy';
import { TransformComponent } from '../../components/TransformComponent';
import { TextComponent } from '../../components/TextComponent';
import { IRenderer } from './IRenderer';

export class TextRenderer implements IRenderer {
	constructor(private readonly context: CanvasRenderingContext2D) { }

	public render(entity: Entity): void {
		const text = entity.getComponent(TextComponent)!;
		const transform = entity.getComponent(TransformComponent)!;

		this.context.font = text.font;
		this.context.fillStyle = text.color;
		this.context.fillText(text.text, transform.position.x, transform.position.y);
	}
}

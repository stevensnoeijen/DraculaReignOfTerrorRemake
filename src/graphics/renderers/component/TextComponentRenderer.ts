import { Entity } from 'ecsy';
import { TransformComponent } from '../../../components/TransformComponent';
import { TextComponent } from '../../../components/TextComponent';
import { IComponentRenderer } from '../IComponentRenderer';
import { TextRenderer } from './../shape/TextRenderer';

export class TextComponentRenderer implements IComponentRenderer {
	private readonly textRenderer: TextRenderer;

	constructor(private readonly context: CanvasRenderingContext2D) {
		this.textRenderer = new TextRenderer(context);
	}

	public render(entity: Entity): void {
		const textComponent = entity.getComponent(TextComponent);
		if (!textComponent) {
			return;
		}

		const transformComponent = entity.getComponent(TransformComponent);
		if (!transformComponent) {
			return;
		}

		this.textRenderer.render(textComponent.text);
	}
}

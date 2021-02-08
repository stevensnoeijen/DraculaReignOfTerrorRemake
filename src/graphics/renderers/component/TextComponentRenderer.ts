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

		this.context.translate(transformComponent.position.x, transformComponent.position.y);

		this.textRenderer.render(textComponent.text);

		this.context.setTransform(1, 0, 0, 1, 0, 0);// reset transform
	}
}

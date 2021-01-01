import { TextComponent } from './components/TextComponent';
import { MovableComponent } from './components/MovableComponent';
import { SelectorComponent } from './components/SelectorComponent';
import { SizeComponent } from './components/SizeComponent';
import { PositionComponent, PositionComponentProps } from './components/PositionComponent';
import { Constants } from './Constants';
import { ShapeComponent } from './components/ShapeComponent';
import { World } from 'ecsy';
import { RenderComponent } from './components/RenderComponent';
import { LayerComponent } from './components/LayerComponent';
import { TweenComponent } from './components/TweenComponent';
import Color from 'color';
import { FpsComponent } from './components/FpsComponent';

interface UnitOptions {
	position: PositionComponentProps;
}

interface SelectorCreateOptions {
	position: PositionComponentProps;
	static?: boolean;
}

interface FpsCounterOptions {
	position: PositionComponentProps;
}

export class EntityFactory {
	public static createUnit(world: World, options: UnitOptions): void {
		const width = Constants.BLOCK_SIZE;
		const height = Constants.BLOCK_SIZE;
		const color = Color('red');

		world
			.createEntity()
			.addComponent(ShapeComponent, {
				type: 'rectangle',
				fillStyle: color.hex(),
			})
			.addComponent(PositionComponent, {
				x: options.position.x,
				y: options.position.y,
			})
			.addComponent(SizeComponent, {
				width: width,
				height: height,
			})
			.addComponent(RenderComponent)
			.addComponent(MovableComponent)
			.addComponent(LayerComponent, {
				layer: 1,
			})
			.addComponent(TweenComponent);
	}

	public static createSelector(
		world: World,
		options: SelectorCreateOptions
	): void {
		world
			.createEntity()
			.addComponent(ShapeComponent, {
				type: 'rectangle',
				lineWidth: 4,
				lineStyle: '#FFF',
			})
			.addComponent(PositionComponent, { x: options.position.x, y: options.position.y })
			.addComponent(SizeComponent, {
				width: Constants.BLOCK_SIZE * 2,
				height: Constants.BLOCK_SIZE,
			})
			.addComponent(SelectorComponent)
			.addComponent(LayerComponent, {
				layer: 2,
			})
			.addComponent(TweenComponent);
	}

	public static createFpsCouter(
		world: World,
		options: FpsCounterOptions
	): void {
		world
			.createEntity()
			.addComponent(RenderComponent)
			.addComponent(TextComponent, {
				text: '0',
				font: '12px Arial',
				color: '#FFF',
			})
			.addComponent(FpsComponent)
			.addComponent(PositionComponent, options.position)
			.addComponent(LayerComponent, {
				layer: 3,
			});
	}
}

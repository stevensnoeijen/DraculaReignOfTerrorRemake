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
import { VisibilityComponent } from './components/VisibilityComponent';
import { SelectableComponent } from './components/SelectableComponent';

interface IUnitProps {
	position: PositionComponentProps;
	color: 'red' | 'blue';
}

interface ISelectorProps {
	position: PositionComponentProps;
	static?: boolean;
}

interface IFpsCounterProps {
	position: PositionComponentProps;
}

export class EntityFactory {

	public static createUnit(world: World, props: IUnitProps): void {
		const width = Constants.BLOCK_SIZE;
		const height = Constants.BLOCK_SIZE;
		const color = Color(props.color);

		world
			.createEntity()
			.addComponent(RenderComponent)
			.addComponent(ShapeComponent, {
				type: 'rectangle',
				fillStyle: color.hex(),
			})
			.addComponent(PositionComponent, {
				x: props.position.x,
				y: props.position.y,
			})
			.addComponent(SizeComponent, {
				width: width,
				height: height,
			})
			.addComponent(MovableComponent)
			.addComponent(LayerComponent, {
				layer: Constants.LAYER_INTERMEDIATE,
			})
			.addComponent(SelectableComponent)
			.addComponent(TweenComponent);
	}

	public static createSelector(
		world: World,
		props: ISelectorProps
	): void {
		world
			.createEntity()
			.addComponent(ShapeComponent, {
				type: 'rectangle',
				lineWidth: 2,
				lineStyle: '#FFF',
			})
			.addComponent(RenderComponent)
			.addComponent(PositionComponent, { x: props.position.x, y: props.position.y })
			.addComponent(SizeComponent, {
				width: 100,
				height: 100,
			})
			.addComponent(SelectorComponent)
			.addComponent(VisibilityComponent, {
				visible: false,
			})
			.addComponent(LayerComponent, {
				layer: Constants.LAYER_FOREGROUND,
			});
	}

	public static createFpsCouter(
		world: World,
		props: IFpsCounterProps
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
			.addComponent(PositionComponent, props.position)
			.addComponent(LayerComponent, {
				layer: Constants.LAYER_FOREGROUND,
			});
	}
}

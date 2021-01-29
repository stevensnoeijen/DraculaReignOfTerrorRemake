import { TextComponent } from './components/TextComponent';
import { MovableComponent } from './components/MovableComponent';
import { SelectorComponent } from './components/SelectorComponent';
import { SizeComponent } from './components/SizeComponent';
import {
	PositionComponent,
	PositionComponentProps,
} from './components/PositionComponent';
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
import { RotationComponent } from './components/RotationComponent';
import { HealthComponent } from './components/HealthComponent';
import { AliveComponent } from './components/AliveComponent';
import { ColliderComponent } from './components/ColliderComponent';
import { Vector2 } from './math/Vector2';

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
		const width = Constants.UNIT_SIZE;
		const height = Constants.UNIT_SIZE;
		const color = Color(props.color);
		let rotation = Math.random() * 360;
		rotation -= rotation % 45;

		world
			.createEntity()
			.addComponent(RenderComponent)
			.addComponent(ShapeComponent, {
				type: 'rectangle',
				fillStyle: color.hex(),
				renderOrigin: 'center',
			})
			.addComponent(PositionComponent, {
				position: new Vector2({
					x: props.position.position.x,
					y: props.position.position.y,
				}),
			})
			.addComponent(SizeComponent, {
				width: width,
				height: height,
			})
			.addComponent(MovableComponent)
			.addComponent(LayerComponent, {
				layer: Constants.LAYER_INTERMEDIATE,
			})
			.addComponent(RotationComponent, {
				rotation: rotation,
			})
			.addComponent(SelectableComponent)
			.addComponent(TweenComponent)
			.addComponent(HealthComponent, {
				points: Math.round(Math.random() * 10),
				maxPoints: 10,
			})
			.addComponent(AliveComponent)
			.addComponent(ColliderComponent, {
				width: width,
				height: height,
			});
	}

	public static createSelector(world: World, props: ISelectorProps): void {
		world
			.createEntity()
			.addComponent(ShapeComponent, {
				type: 'rectangle',
				lineWidth: 2,
				lineStyle: '#FFF',
				renderOrigin: 'topleft',
			})
			.addComponent(RenderComponent)
			.addComponent(PositionComponent, {
				position: new Vector2({
					x: props.position.position.x,
					y: props.position.position.y,
				}),
			})
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

	public static createFpsCouter(world: World, props: IFpsCounterProps): void {
		world
			.createEntity()
			.addComponent(RenderComponent)
			.addComponent(TextComponent, {
				text: '0',
				font: '12px Arial',
				color: '#FFF',
			})
			.addComponent(FpsComponent)
			.addComponent(PositionComponent, {
				position: new Vector2({
					x: props.position.position.x,
					y: props.position.position.y,
				}),
			})
			.addComponent(LayerComponent, {
				layer: Constants.LAYER_FOREGROUND,
			});
	}
}

import { Fps } from './components/Fps';
import { Text } from './components/Text';
import { Movable } from './components/Movable';
import { Selector } from './components/Selector';
import { Size } from './components/Size';
import { Position, PositionOptions } from './components/Position';
import { Constants } from './Constants';
import { Shape } from './components/Shape';
import { World } from 'ecsy';
import { Renderable } from './components/Renderable';
import { Layered } from './components/Layered';
import { Tweenable } from './components/Tweenable';
import { GridPosition } from './components/GridPosition';
import Color from 'color';

interface UnitOptions {
	position: PositionOptions;
}

interface SelectorCreateOptions {
	position: PositionOptions;
	static?: boolean;
}

interface FpsCounterOptions {
	position: PositionOptions;
}

export class EntityFactory {
	public static createUnit(world: World, options: UnitOptions): void {
		const width = Constants.BLOCK_SIZE;
		const height = Constants.BLOCK_SIZE;
		const color = Color('red');

		world
			.createEntity()
			.addComponent(Shape, {
				type: 'rectangle',
				fillStyle: color.hex(),
			})
			.addComponent(Position, {
				x: options.position.x,
				y: options.position.y,
			})
			.addComponent(Size, {
				width: width,
				height: height,
			})
			.addComponent(Renderable)
			.addComponent(Movable)
			.addComponent(Layered, {
				layer: 1,
			})
			.addComponent(GridPosition)
			.addComponent(Tweenable);
	}

	public static createSelector(
		world: World,
		options: SelectorCreateOptions
	): void {
		world
			.createEntity()
			.addComponent(Shape, {
				type: 'rectangle',
				lineWidth: 4,
				lineStyle: '#FFF',
			})
			.addComponent(Position, { x: options.position.x, y: options.position.y })
			.addComponent(Size, {
				width: Constants.BLOCK_SIZE * 2,
				height: Constants.BLOCK_SIZE,
			})
			.addComponent(Selector)
			.addComponent(Layered, {
				layer: 2,
			})
			.addComponent(Tweenable);
	}

	public static createFpsCouter(
		world: World,
		options: FpsCounterOptions
	): void {
		world
			.createEntity()
			.addComponent(Renderable)
			.addComponent(Text, {
				text: '0',
				font: '12px Arial',
				color: '#FFF',
			})
			.addComponent(Fps)
			.addComponent(Position, options.position)
			.addComponent(Layered, {
				layer: 3,
			});
	}
}

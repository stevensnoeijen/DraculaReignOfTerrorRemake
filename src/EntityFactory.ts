import { GraphicsComponent } from './components/GraphicsComponent';
import { World } from 'ecsy';
import * as PIXI from 'pixi.js';

import { SpriteComponent } from './components/SpriteComponent';
import { MovableComponent } from './components/MovableComponent';
import { SizeComponent } from './components/SizeComponent';
import { TransformComponent } from './components/TransformComponent';
import { Constants } from './Constants';
import { LayerComponent } from './components/LayerComponent';
import { SelectableComponent } from './components/SelectableComponent';
import { HealthComponent } from './components/HealthComponent';
import { AliveComponent } from './components/AliveComponent';
import { Vector2 } from './math/Vector2';
import { PlayerMovementMouseComponent } from './components/PlayerMovementMouseComponent';
import { MovePositionDirectComponent } from './components/MovePositionDirectComponent';
import { PlayerMovementKeysComponent } from './components/PlayerMovementKeysComponent';
import { MoveVelocityComponent } from './components/MoveVelocityComponent';

type Position = { x: number; y: number };

interface IUnitProps {
	position: Position;
	color: 'red' | 'blue';
	texture: PIXI.Texture<PIXI.Resource>;
}

interface ISelectorProps {
	position: Position;
	static?: boolean;
}

interface IFpsCounterProps {
	position: Position;
}

export class EntityFactory {
	static first = true;

	public static createUnit(world: World, props: IUnitProps): void {
		const width = Constants.CELL_SIZE;
		const height = Constants.CELL_SIZE;
		let rotation = Math.random() * 360;
		rotation -= rotation % 90;

		const sprite = new PIXI.Sprite(props.texture);
		sprite.anchor.set(0.5);
		sprite.position.set(props.position.x, props.position.y);

		world
			.createEntity()
			.addComponent(TransformComponent, {
				position: new Vector2(props.position.x, props.position.y),
				rotation: rotation,
			})
			.addComponent(SizeComponent, {
				width: width,
				height: height,
			})
			.addComponent(MovableComponent)
			.addComponent(LayerComponent, {
				layer: Constants.LAYER_UNITS,
			})
			.addComponent(SelectableComponent)
			.addComponent(HealthComponent, {
				points: Math.round(Math.random() * 10),
				maxPoints: 10,
			})
			.addComponent(AliveComponent)
			.addComponent(MoveVelocityComponent, {
				moveSpeed: 50,
			})
			.addComponent(PlayerMovementKeysComponent)
			.addComponent(MovePositionDirectComponent)
			.addComponent(PlayerMovementMouseComponent)
			.addComponent(SpriteComponent, {
				sprite: sprite,
			})
			.addComponent(GraphicsComponent, {
				graphics: new PIXI.Graphics(),
			});

	}
}

import { ControlledComponent } from './systems/ControlledComponent';
import { TargetComponent } from './systems/ai/TargetComponent';
import { Entity, World } from 'ecsy';
import * as PIXI from 'pixi.js';

import { SpriteComponent } from './systems/render/sprite/SpriteComponent';
import { MovableComponent } from './systems/movement/MovableComponent';
import { SizeComponent } from './systems/SizeComponent';
import { TransformComponent } from './systems//TransformComponent';
import { Constants } from './Constants';
import { SelectableComponent } from './systems/selection/SelectableComponent';
import { HealthComponent } from './systems/health/HealthComponent';
import { AliveComponent } from './systems/alive/AliveComponent';
import { Vector2 } from './math/Vector2';
import { PlayerMovementMouseComponent } from './systems/player/PlayerMovementMouseComponent';
import { MovePositionDirectComponent } from './systems/movement/MovePositionDirectComponent';
import { PlayerMovementKeysComponent } from './systems/player/PlayerMovementKeysComponent';
import { MoveVelocityComponent } from './systems/movement/MoveVelocityComponent';
import { GraphicsComponent } from './systems/render/graphics/GraphicsComponent';
import { CollidableComponent } from './systems/movement/CollidableComponent';
import { MovePathComponent } from './systems/movement/MovePathComponent';
import { TeamComponent } from './systems/TeamComponent';
import { FollowComponent } from './systems/movement/FollowComponent';
import { Position } from './utils';
import { AttackComponent } from './systems/AttackComponent';

interface IUnitProps {
	position: Position;
	color: 'red' | 'blue';
	texture: PIXI.Texture<PIXI.Resource>;
	team: {
		number: number;
	};
}

export class EntityFactory {
	public static createUnit(world: World, props: IUnitProps): Entity {
		const width = Constants.CELL_SIZE;
		const height = Constants.CELL_SIZE;
		let rotation = Math.random() * 360;
		rotation -= rotation % 90;

		const sprite = new PIXI.Sprite(props.texture);
		sprite.anchor.set(0.5);
		sprite.position.set(props.position.x, props.position.y);

		return world
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
			.addComponent(SelectableComponent)
			.addComponent(HealthComponent, {
				points: 10,
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
			})
			.addComponent(MovePathComponent, { path: [] })
			.addComponent(CollidableComponent)
			.addComponent(TeamComponent, props.team)
			.addComponent(FollowComponent)
			.addComponent(AttackComponent, {
				aggroRange: 80,
				attackRange: 16,
				attackDamage: 1,
			})
			.addComponent(TargetComponent)
			.addComponent(ControlledComponent);

	}
}

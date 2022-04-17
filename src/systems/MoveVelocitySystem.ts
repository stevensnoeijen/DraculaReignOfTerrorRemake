import { Attributes, Entity, System, SystemQueries, World } from 'ecsy';
import { AliveComponent } from '../components/AliveComponent';
import { MoveVelocityComponent } from '../components/MoveVelocityComponent';
import { SizeComponent } from '../components/SizeComponent';
import { SpriteComponent } from '../components/SpriteComponent';
import { TransformComponent } from '../components/TransformComponent';
import { Constants } from '../Constants';
import { EntityHelper } from '../helpers/EntityHelper';
import { Bounds } from '../math/collision/Bounds';
import { Vector2 } from '../math/Vector2';

export class MoveVelocitySystem extends System {
	public static queries: SystemQueries = {
		bodies: {
			components: [MoveVelocityComponent, TransformComponent],
			listen: {
				added: true,
			}
		},
		alive: {
			components: [AliveComponent],
			listen: {
				changed: true,
			}
		}
	};

	constructor(world: World, attributes: Attributes) {
		super(world, attributes);
	}

	public execute(delta: number, time: number): void {
		this.queries.bodies.results.forEach((entity) => this.updateEntityBody(entity, delta));
	}

	private updateEntityBody(entity: Entity, delta: number): void {
		const moveVelocityComponent = entity.getMutableComponent(MoveVelocityComponent);
		if (moveVelocityComponent?.velocity == null) {
			return;
		}

		const transformComponent = entity.getMutableComponent(TransformComponent);
		if (!transformComponent) {
			return;
		}

		
		const speed = moveVelocityComponent!.moveSpeed * (delta / 1000);

		transformComponent.position.x = transformComponent.position.x + moveVelocityComponent.velocity.x;
		transformComponent.position.y = transformComponent.position.y + moveVelocityComponent.velocity.y;

		const spriteComponent = entity.getComponent(SpriteComponent);
		if (spriteComponent != null){
			spriteComponent.sprite.position.set(transformComponent.position.x, transformComponent.position.y);
		}
	}
}

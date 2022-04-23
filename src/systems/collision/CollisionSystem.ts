import { DefaultAttributes } from '../DefaultAttributes';
import { Entity, System, SystemQueries, World } from "ecsy";

import { LevelLoadedEvent, Events } from '../../Events';
import { Vector2 } from '../../math/Vector2';
import { Predicate } from "../../utils";
import { MoveTransformVelocityComponent } from "../movement/MoveTransformVelocityComponent";
import { SizeComponent } from "../SizeComponent";
import { TransformComponent } from "../TransformComponent";
import { CollidableComponent } from './CollidableComponent';
import { MoveVelocityComponent } from '../movement/MoveVelocityComponent';

export class CollisionSystem extends System {
    public static queries: SystemQueries = {
		movables: {
			components: [TransformComponent, MoveVelocityComponent],
		},
		colliders: {
			components: [CollidableComponent],
		},
	};
	
	private map: number[][]|null = null;

    constructor(world: World, attributes: DefaultAttributes) {
        super(world, attributes);

        attributes.eventBus.on<LevelLoadedEvent>('level:loaded', (event) => {
            this.map = event.detail.level.collisionMap;
        });
    }

	public execute(delta: number, time: number): void {
		for (const entity of this.queries.movables.results) {
			const moveVelocityComponent = entity.getComponent(MoveVelocityComponent);
			if (!moveVelocityComponent) {
				continue;
			}
			const transformComponent = entity.getMutableComponent(TransformComponent);
			if (!transformComponent) {
				continue;
			}

			if (!moveVelocityComponent.velocity?.equals(Vector2.ZERO)) {
				// check collision with other colliders
                const colliders = this.queries.colliders.results.filter(isNotEntity(entity));

                const collider = colliders.find((collider) => {
                    return boxesIntersect(getBound(entity), getBound(collider));
                });

                if (collider != null) {
                    if(moveVelocityComponent.velocity != null) {
                        // move back
						// TODO: implement me
                        console.log('collided');
                        // const colliderTransformComponent = collider.getComponent(TransformComponent)!;
                        // transformComponent.position.x -= 1;//colliderTransformComponent.position.x - transformComponent.position.x + 16;
                        // transformComponent.position.y -= 1;//colliderTransformComponent.position.y - transformComponent.position.y + 16;
                    }
                }

				if (this.map != null) {
					// TODO: add collide for manual movement
				}
			}
		}
	}
}

const isNotEntity = (entity: Entity): Predicate<Entity> => {
	return (other: Entity) => other.id !== entity.id;
}

const getBound = (entity: Entity): Bound => {
	const transformComponent = entity.getComponent(TransformComponent)!;
	const sizeComponent = entity.getComponent(SizeComponent)!;

	return {
		...transformComponent.position,
		width: sizeComponent.width,
		height: sizeComponent.height,
	}
}

type Bound = { x: number, y: number, width: number, height: number };
const boxesIntersect = (a: Bound, b: Bound): boolean => {
	return a.x + a.width > b.x && a.x < b.x + b.width && a.y + a.height > b.y && a.y < b.y + b.height;
}
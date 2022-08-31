import { Entity, System, SystemQueries } from 'ecsy';

import { Transform } from '../../components/Transform';

import { getSimComponent } from './../utils/index';
import { SimEcsComponent } from './../SimEcsComponent';
import { MoveVelocityComponent } from './MoveVelocityComponent';


export class MoveVelocitySystem extends System {
  public static queries: SystemQueries = {
    bodies: {
      components: [MoveVelocityComponent, SimEcsComponent],
      listen: {
        added: true,
      },
    },
  };

  public execute(delta: number, time: number): void {
    this.queries.bodies.results.forEach((entity) =>
      this.updateEntityBody(entity, delta)
    );
  }

  private updateEntityBody(entity: Entity, delta: number): void {
    const moveVelocityComponent = entity.getMutableComponent(
      MoveVelocityComponent
    );
    if (moveVelocityComponent?.velocity == null) {
      return;
    }

    const transformComponent = getSimComponent(entity, Transform);
    if (!transformComponent) {
      return;
    }

    transformComponent.position.x =
      transformComponent.position.x + moveVelocityComponent.velocity.x;
    transformComponent.position.y =
      transformComponent.position.y + moveVelocityComponent.velocity.y;
  }
}

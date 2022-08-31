import { Entity, System } from 'ecsy';

import { Input } from '../../Input';
import { Vector2 } from '../../math/Vector2';
import { SelectableComponent } from '../selection/SelectableComponent';
import { MoveVelocity } from '../../components/movement/MoveVelocity';
import { Transform } from '../../components/Transform';

import { PlayerMovementKeysComponent } from './PlayerMovementKeysComponent';
import { getSimComponent } from './../utils/index';

export class PlayerMovementKeysSystem extends System {
  public static queries = {
    entities: {
      components: [PlayerMovementKeysComponent, SelectableComponent],
    },
  };

  public execute(delta: number, time: number): void {
    for (const entity of this.queries.entities.results) {
      const selectableComponent = entity.getComponent(SelectableComponent);
      if (!selectableComponent || !selectableComponent.selected) {
        continue;
      }

      this.handleMovement(entity);
      this.handleAction(entity);
    }
  }

  private handleMovement(entity: Entity): void {
    let moveX = 0;
    let moveY = 0;

    if (Input.isKeyDown('w')) {
      moveY -= 1;
    }
    if (Input.isKeyDown('s')) {
      moveY += 1;
    }
    if (Input.isKeyDown('a')) {
      moveX -= 1;
    }
    if (Input.isKeyDown('d')) {
      moveX += 1;
    }

    const moveVelocity = new Vector2(moveX, moveY).normalized();

    const moveVelocityComponent = getSimComponent(entity, MoveVelocity);
    if (moveVelocityComponent) {
      moveVelocityComponent.velocity = moveVelocity;
    }

    const transformComponent = getSimComponent(entity, Transform);
    if (!transformComponent) {
      return;
    }

    if (!moveVelocity.equals(Vector2.ZERO)) {
      transformComponent.rotation =
        Vector2.angle(Vector2.ZERO, moveVelocity) - 90;
    }
  }

  private handleAction(entity: Entity): void {
    if (Input.isKeyDown('Escape')) {
      const component = entity.getMutableComponent(SelectableComponent);
      if (component != null) {
        component.selected = false;
      }
    }
  }
}

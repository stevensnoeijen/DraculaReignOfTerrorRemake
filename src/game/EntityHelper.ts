import { Entity } from 'ecsy';

import { getSimComponent } from './systems/utils/index';
import { Transform } from './components/Transform';
import { SelectableComponent } from './systems/selection/SelectableComponent';
import { Size } from './components/Size';
import { MovePositionDirectComponent } from './systems/movement/MovePositionDirectComponent';
import { Bounds } from './math/collision/Bounds';
import { Vector2 } from './math/Vector2';

export class EntityHelper {
  public static isPositionInsideEntity(
    entity: Entity,
    x: number,
    y: number
  ): boolean {
    const transform = getSimComponent(entity, Transform);
    const size = getSimComponent(entity, Size);

    if (!transform || !size) {
      // position or/and size isnt set
      return false;
    }

    const bounds = new Bounds(
      transform.position,
      new Vector2(size.width, size.height)
    );
    return bounds.contains(new Vector2(x, y));
  }

  /**
   * Based on {@link Position} and {@link Size}.
   *
   * @param {Entity} container
   * @param {Entity} object is contained in the container
   *
   * @returns {boolean} true if the objects is inside the container
   */
  public static isObjectInsideContainer(
    object: Entity,
    container: { x: number; y: number; width: number; height: number }
  ): boolean {
    const objectTransform = getSimComponent(object, Transform);
    if (!objectTransform) {
      return false;
    }

    return (
      objectTransform.position.x >= container.x &&
      objectTransform.position.x <= container.x + container.width &&
      objectTransform.position.y >= container.y &&
      objectTransform.position.y <= container.y + container.height
    );
  }

  public static deselect(entity: Entity): void {
    const selectable = entity.getMutableComponent(SelectableComponent);
    if (!selectable) {
      return;
    }
    selectable.selected = false;
  }

  public static select(entity: Entity): void {
    const selectable = entity.getMutableComponent(SelectableComponent);
    if (!selectable) {
      return;
    }
    selectable.selected = true;
  }

  public static isSelected(entity: Entity): boolean {
    const selectable = entity.getComponent(SelectableComponent);
    if (!selectable) {
      return false;
    }

    return selectable.selected;
  }

  public static isMoving(entity: Entity): boolean {
    const movePositionDirectComponent = entity.getComponent(
      MovePositionDirectComponent
    );
    if (!movePositionDirectComponent) {
      return false;
    }

    return movePositionDirectComponent.movePosition !== null;
  }
}

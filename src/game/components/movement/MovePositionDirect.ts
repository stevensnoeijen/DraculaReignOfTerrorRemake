import { Vector2 } from '../../math/Vector2';

import { toGridPosition } from '~/game/utils/grid';

export class MovePositionDirect {
  constructor(public position: Vector2 | null = null) {}

  public get gridPosition(): Vector2 | null {
    return this.position == null ? null : toGridPosition(this.position);
  }
}

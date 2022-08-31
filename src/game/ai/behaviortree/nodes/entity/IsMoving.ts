import { Entity } from 'ecsy';

import { MovePositionDirect } from '../../../../components/movement/MovePositionDirect';
import { State } from '../Node';

import { hasSimComponent, getSimComponent } from './../../../../systems/utils/index';
import { EntityNode } from './EntityNode';

export class IsMoving extends EntityNode {
  protected evaluateByEntity(entity: Entity): State {
    if (!hasSimComponent(entity, MovePositionDirect)) {
      return this.failure();
    }
    const movePositionDirect = getSimComponent(entity, MovePositionDirect)!;
    if (movePositionDirect.movePosition == null) {
      return this.failure();
    }

    return this.success();
  }
}

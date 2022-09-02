import { IEntity } from 'sim-ecs';

import { MovePositionDirect } from '../../../../components/movement/MovePositionDirect';
import { State } from '../Node';

import { EntityNode } from './EntityNode';

export class IsMoving extends EntityNode {
  protected evaluateByEntity(entity: IEntity): State {
    if (!entity.hasComponent(MovePositionDirect)) {
      return this.failure();
    }
    const movePositionDirect = entity.getComponent(MovePositionDirect)!;
    if (movePositionDirect.movePosition == null) {
      return this.failure();
    }

    return this.success();
  }
}

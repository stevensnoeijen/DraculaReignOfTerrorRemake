import { IEntity } from 'sim-ecs';

import { State as NodeState } from '../Node';

import { EntityNode } from './EntityNode';

import { randomRotation } from '~/game/utils/components/transform';
import { Transform } from '~/game/components';

export class RotateToRandomDirection extends EntityNode {
  protected evaluateByEntity(entity: IEntity): NodeState {
    const transform = entity.getComponent(Transform);

    if (transform == null) return this.failure();

    transform.rotation = randomRotation();

    return this.success();
  }
}

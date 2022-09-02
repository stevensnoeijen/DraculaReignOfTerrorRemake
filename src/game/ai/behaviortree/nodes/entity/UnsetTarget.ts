
import { IEntity } from 'sim-ecs';

import { State } from '../Node';
import { Target } from '../../../../components/ai/Target';

import { EntityNode } from './EntityNode';


export class UnsetTarget extends EntityNode {
  protected evaluateByEntity(entity: IEntity): State {
    if (!entity.hasComponent(Target)) {
      return this.failure();
    }
    const targetComponent = entity.getComponent(Target)!;
    if (targetComponent.entity == null) {
      return this.failure();
    }
    targetComponent.entity = null;

    return this.success();
  }
}

import { Entity } from 'ecsy';

import { State } from '../Node';
import { EntityNode } from './EntityNode';
import { TargetComponent } from '../../../../systems/ai/TargetComponent';

export class HasTarget extends EntityNode {
  protected evaluateByEntity(entity: Entity): State {
    if (!entity.hasComponent(TargetComponent)) {
      return this.failure();
    }
    const targetComponent = entity.getComponent(TargetComponent)!;
    if (targetComponent.target == null) {
      return this.failure();
    }

    return this.success();
  }
}

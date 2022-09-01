import { Entity } from 'ecsy';

import { State } from '../Node';
import { Target } from '../../../../components/ai/Target';

import { hasSimComponent } from './../../../../systems/utils/index';
import { EntityNode } from './EntityNode';

import { getSimComponent } from '~/game/systems/utils';

export class UnsetTarget extends EntityNode {
  protected evaluateByEntity(entity: Entity): State {
    if (!hasSimComponent(entity, Target)) {
      return this.failure();
    }
    const targetComponent = getSimComponent(entity, Target)!;
    if (targetComponent.entity == null) {
      return this.failure();
    }
    targetComponent.entity = null;

    return this.success();
  }
}

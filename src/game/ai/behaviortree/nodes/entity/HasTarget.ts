import { Entity } from 'ecsy';

import { State } from '../Node';
import { Target } from '../../../../components/ai/Target';

import { EntityNode } from './EntityNode';

import { hasSimComponent, getSimComponent } from '~/game/systems/utils';

export class HasTarget extends EntityNode {
  protected evaluateByEntity(entity: Entity): State {
    if (!hasSimComponent(entity, Target)) {
      return this.failure();
    }
    const targetComponent = getSimComponent(entity, Target)!;
    if (targetComponent.entity == null) {
      return this.failure();
    }

    return this.success();
  }
}

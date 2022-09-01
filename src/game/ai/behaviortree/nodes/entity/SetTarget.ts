import { Entity } from 'ecsy';

import { State } from '../Node';
import { Target } from '../../../../components/ai/Target';

import { hasSimComponent } from './../../../../systems/utils/index';
import { EntityNode } from './EntityNode';

import { getSimComponent } from '~/game/systems/utils';

export class SetTarget extends EntityNode {
  protected evaluateByEntity(entity: Entity): State {
    const target = this.getData('target') as Entity | null;

    if (target == null || !hasSimComponent(entity, Target)) {
      return this.failure();
    }

    const targetComponent = getSimComponent(entity, Target)!;
    targetComponent.entity = target;

    return this.success();
  }
}

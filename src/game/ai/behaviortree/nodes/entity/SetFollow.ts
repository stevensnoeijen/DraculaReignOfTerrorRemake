import { Entity } from 'ecsy';

import { State } from '../Node';
import { Follow } from '../../../../components/ai/Follow';
import { TargetComponent } from '../../../../systems/ai/TargetComponent';

import { EntityNode } from './EntityNode';

import { getSimComponent } from '~/game/systems/utils';

export class SetFollow extends EntityNode {
  protected evaluateByEntity(entity: Entity): State {
    const targetComponent = entity.getComponent(TargetComponent);
    const followComponent = getSimComponent(entity, Follow);

    if (targetComponent == null || followComponent == null) {
      return this.failure();
    }

    followComponent.entity = targetComponent.target;

    return this.success();
  }
}

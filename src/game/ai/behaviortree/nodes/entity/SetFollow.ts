import { Entity } from 'ecsy';

import { State } from '../Node';
import { Follow } from '../../../../components/ai/Follow';
import { Target } from '../../../../components/ai/Target';

import { EntityNode } from './EntityNode';

import { getSimComponent } from '~/game/systems/utils';

export class SetFollow extends EntityNode {
  protected evaluateByEntity(entity: Entity): State {
    const targetComponent = getSimComponent(entity, Target);
    const followComponent = getSimComponent(entity, Follow);

    if (targetComponent == null || followComponent == null) {
      return this.failure();
    }

    followComponent.entity = targetComponent.entity;

    return this.success();
  }
}

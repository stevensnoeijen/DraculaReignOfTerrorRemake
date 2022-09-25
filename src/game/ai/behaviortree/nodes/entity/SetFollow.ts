import { IEntity } from 'sim-ecs';

import { State } from '../Node';
import { Follow } from '../../../../components/ai/Follow';
import { Target } from '../../../../components/ai/Target';

import { EntityNode } from './EntityNode';

export class SetFollow extends EntityNode {
  protected evaluateByEntity(entity: IEntity): State {
    const follow = entity.getComponent(Follow);
    const target = entity.getComponent(Target);

    if (follow == null || target?.entity == null) {
      return this.failure();
    }

    follow.entity = target.entity;

    return this.success();
  }
}

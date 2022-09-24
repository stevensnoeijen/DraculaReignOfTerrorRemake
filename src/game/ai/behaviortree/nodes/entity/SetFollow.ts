import { IEntity } from 'sim-ecs';

import { State } from '../Node';
import { Follow } from '../../../../components/ai/Follow';

import { EntityNode } from './EntityNode';

export class SetFollow extends EntityNode {
  protected evaluateByEntity(entity: IEntity): State {
    const follow = entity.getComponent(Follow);
    const target = this.root.getData('target');

    if (follow == null || target == null) {
      return this.failure();
    }

    follow.entity = target as IEntity;

    return this.success();
  }
}

import { IEntity } from 'sim-ecs';

import { State } from '../Node';
import { Combat } from '../../../../components/ai/Combat';

import { EntityNode } from './EntityNode';

import { Target } from '~/game/components';

export class Attack extends EntityNode {
  protected evaluateByEntity(entity: IEntity): State {
    const combat = entity.getComponent(Combat);
    const target = entity.getComponent(Target);

    if (combat == null || target?.entity == null) return this.failure();

    combat.attack(target.entity);

    return this.success();
  }
}

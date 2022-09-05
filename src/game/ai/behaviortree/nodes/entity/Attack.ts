import { IEntity } from 'sim-ecs';

import { State } from '../Node';
import { Combat } from '../../../../components/ai/Combat';

import { EntityNode } from './EntityNode';

import { BehaviorTree } from '~/game/components/ai/BehaviorTree';
import { StartedAttacking } from '~/game/events/StartedAttacking';

export class Attack extends EntityNode {
  protected evaluateByEntity(entity: IEntity): State {
    const combat = entity.getComponent(Combat)!;
    const target = this.getData('target') as IEntity;

    const behaviorTree = entity.getComponent(BehaviorTree);
    if (behaviorTree != null) {
      behaviorTree.addEvent(new StartedAttacking(entity));
    }

    combat.attack(target);

    return this.success();
  }
}

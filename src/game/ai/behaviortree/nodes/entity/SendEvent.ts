
import { IEntity } from 'sim-ecs';

import { State } from '../Node';

import { EntityNode } from './EntityNode';

import { BehaviorTree } from '~/game/components/ai/BehaviorTree';
import { EntityEventConstructor } from '~/game/events/EntityEvent';

export class SendEvent extends EntityNode {
  constructor(
    private eventConstructor: EntityEventConstructor,
  ) {
    super([]);
  }

  protected evaluateByEntity(entity: IEntity): State {
    const behaviorTree = entity.getComponent(BehaviorTree)!;
    behaviorTree.addEvent(new this.eventConstructor(entity));

    return this.success();
  }
}

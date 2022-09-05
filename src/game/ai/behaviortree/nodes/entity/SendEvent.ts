
import { IEntity } from 'sim-ecs';

import { State } from '../Node';

import { EntityNode } from './EntityNode';

import { BehaviorTree } from '~/game/components/ai/BehaviorTree';
import { AbstractEntityEventConstructor } from '~/game/events/AbstractEntityEvent';


export class SendEvent extends EntityNode {
  constructor(
    private eventConstructor: AbstractEntityEventConstructor,
  ) {
    super([]);
  }

  protected evaluateByEntity(entity: IEntity): State {
    const behaviorTree = entity.getComponent(BehaviorTree)!;
    behaviorTree.addEvent(new this.eventConstructor(entity));

    return this.success();
  }
}

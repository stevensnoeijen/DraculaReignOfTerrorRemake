
import { IEntity } from 'sim-ecs';

import { State } from '../Node';
import { Target } from '../../../../components/ai/Target';

import { EntityNode } from './EntityNode';


export class SetTarget extends EntityNode {
  protected evaluateByEntity(entity: IEntity): State {
    const targetEntity = this.getData('target') as IEntity | null;

    if (targetEntity == null || !entity.hasComponent(Target)) {
      return this.failure();
    }

    const targetComponent = entity.getComponent(Target)!;
    targetComponent.entity = targetEntity;

    return this.success();
  }
}

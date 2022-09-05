import { IEntity } from 'sim-ecs';

import { State } from '../Node';
import { Combat } from '../../../../components/ai/Combat';

import { EntityNode } from './EntityNode';

export class Attack extends EntityNode {
  protected evaluateByEntity(entity: IEntity): State {
    const combat = entity.getComponent(Combat)!;
    const target = this.getData('target') as IEntity;

    combat.attack(target);

    return this.success();
  }
}

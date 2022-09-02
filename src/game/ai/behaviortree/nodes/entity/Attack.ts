import { IEntity } from 'sim-ecs';

import { State } from '../Node';
import { Combat } from '../../../../components/ai/Combat';

import { EntityNode } from './EntityNode';

import { setEntityAnimation } from '~/game/systems/utils/animation';

export class Attack extends EntityNode {
  protected evaluateByEntity(entity: IEntity): State {
    const combat = entity.getComponent(Combat)!;
    const target = this.getData('target') as IEntity;

    setEntityAnimation(entity, 'attack');
    combat.attack(target);

    return this.success();
  }
}

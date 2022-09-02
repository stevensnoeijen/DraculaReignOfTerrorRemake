import { Entity } from 'ecsy';

import { State } from '../Node';
import { Combat } from '../../../../components/ai/Combat';

import { EntityNode } from './EntityNode';

import { setEntityAnimation } from '~/game/systems/utils/animation';
import { getSimComponent } from '~/game/systems/utils';

export class Attack extends EntityNode {
  protected evaluateByEntity(entity: Entity): State {
    const combat = getSimComponent(entity, Combat)!;
    const target = this.getData('target') as Entity;

    setEntityAnimation(entity, 'attack');
    combat.attack(target);

    return this.success();
  }
}

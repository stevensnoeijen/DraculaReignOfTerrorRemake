import { Entity } from 'ecsy';

import { State } from '../Node';

import { EntityNode } from './EntityNode';
import { AttackComponent } from './../../../../systems/AttackComponent';

import { setEntityAnimation } from '~/game/systems/utils/animation';

export class Attack extends EntityNode {
  protected evaluateByEntity(entity: Entity): State {
    const attackComponent = entity.getComponent(AttackComponent)!;
    const target = this.getData('target') as Entity;

    setEntityAnimation(entity, 'attack');
    attackComponent.attack(target);

    return this.success();
  }
}

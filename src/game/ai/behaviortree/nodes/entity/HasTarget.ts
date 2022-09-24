import { IEntity } from 'sim-ecs';

import { State } from '../Node';

import { EntityNode } from './EntityNode';

export class HasTarget extends EntityNode {
  protected evaluateByEntity(entity: IEntity): State {
    return this.hasData('target') ? this.success() : this.failure();
    // if (!entity.hasComponent(Target)) return this.failure();

    // const target = entity.getComponent(Target)!;
    // if (target.entity == null) return this.failure();

    // return this.success();
  }
}

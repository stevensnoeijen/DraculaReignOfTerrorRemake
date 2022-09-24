import { IEntity } from 'sim-ecs';

import { State } from '../Node';

import { EntityNode } from './EntityNode';

export class SetTarget extends EntityNode {
  protected evaluateByEntity(entity: IEntity): State {
    const enemy = this.getData('enemy') as IEntity | null;

    if (enemy == null) {
      return this.failure();
    }

    this.root.setData('target', enemy);
    return this.success();
  }
}

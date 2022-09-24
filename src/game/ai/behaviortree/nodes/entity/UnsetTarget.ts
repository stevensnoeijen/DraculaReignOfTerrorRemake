import { IEntity } from 'sim-ecs';

import { State } from '../Node';

import { EntityNode } from './EntityNode';

export class UnsetTarget extends EntityNode {
  protected evaluateByEntity(_entity: IEntity): State {
    this.root.setData('target', null);

    return this.success();
  }
}

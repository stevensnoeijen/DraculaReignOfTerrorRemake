import { IEntity } from 'sim-ecs';

import { Node, State } from '../Node';

export abstract class EntityNode extends Node {
  public evaluate(): State {
    const entity = this.getData('entity') as IEntity | null;
    if (entity == null) {
      return this.failure();
    }

    return this.evaluateByEntity(entity);
  }

  protected abstract evaluateByEntity(entity: IEntity): State;
}

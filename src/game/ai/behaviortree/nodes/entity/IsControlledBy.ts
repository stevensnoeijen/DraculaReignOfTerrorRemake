
import { IEntity } from 'sim-ecs';

import { State } from '../Node';
import {
  By,
  Controlled,
} from '../../../../components/input/Controlled';

import { EntityNode } from './EntityNode';


export class IsControlledBy extends EntityNode {
  constructor(private readonly by: By) {
    super([]);
  }

  protected evaluateByEntity(entity: IEntity): State {
    if (!entity.hasComponent(Controlled)) {
      return this.failure();
    }
    const controlled = entity.getComponent(Controlled)!;
    if (controlled.by === this.by) {
      return this.success();
    }

    return this.failure();
  }
}

import { Entity } from 'ecsy';

import { State } from '../Node';
import { EntityNode } from './EntityNode';
import {
  By,
  ControlledComponent,
} from '../../../../systems/ControlledComponent';

export abstract class IsControlledBy extends EntityNode {
  constructor(private readonly by: By) {
    super([]);
  }

  protected evaluateByEntity(entity: Entity): State {
    if (!entity.hasComponent(ControlledComponent)) {
      return this.failure();
    }
    const controlledComponent = entity.getComponent(ControlledComponent)!;
    if (controlledComponent.by === this.by) {
      return this.success();
    }

    return this.failure();
  }
}

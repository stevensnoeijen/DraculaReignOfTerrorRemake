import { Entity } from 'ecsy';

import { State } from '../Node';
import {
  By,
  Controlled,
} from '../../../../components/input/Controlled';

import { hasSimComponent } from './../../../../systems/utils/index';
import { EntityNode } from './EntityNode';

import { getSimComponent } from '~/game/systems/utils';

export abstract class IsControlledBy extends EntityNode {
  constructor(private readonly by: By) {
    super([]);
  }

  protected evaluateByEntity(entity: Entity): State {
    if (!hasSimComponent(entity, Controlled)) {
      return this.failure();
    }
    const controlled = getSimComponent(entity, Controlled)!;
    if (controlled.by === this.by) {
      return this.success();
    }

    return this.failure();
  }
}

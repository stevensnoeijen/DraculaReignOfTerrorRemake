import { IEntity } from 'sim-ecs';

import { State as NodeState } from '../Node';

import { EntityNode } from './EntityNode';

import { UnitState } from '~/game/components/UnitState';
import { UnitState as State } from '~/game/types';

export class IsUnitState extends EntityNode {
  constructor(private readonly unitState: State) {
    super();
  }

  protected evaluateByEntity(entity: IEntity): NodeState {
    const unitState = entity.getComponent(UnitState)!;

    if (unitState.state === this.unitState) return this.success();

    return this.failure();
  }
}

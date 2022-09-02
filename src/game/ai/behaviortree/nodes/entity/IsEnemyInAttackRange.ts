import { IEntity } from 'sim-ecs';

import { Combat } from '../../../../components/ai/Combat';

import { IsEnemyInRange } from './IsEnemyInRange';

export class IsEnemyInAttackRange extends IsEnemyInRange<Combat> {
  constructor(entities: IEntity[]) {
    super(entities, Combat, 'attackRange');
  }
}

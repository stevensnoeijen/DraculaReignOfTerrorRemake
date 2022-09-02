import { Entity } from 'ecsy';

import { Combat } from '../../../../components/ai/Combat';

import { IsEnemyInRange } from './IsEnemyInRange';

export class IsEnemyInAttackRange extends IsEnemyInRange<Combat> {
  constructor(entities: Entity[]) {
    super(entities, Combat, 'attackRange');
  }
}

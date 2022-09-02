import { Entity } from 'ecsy';

import { Combat } from '../../../../components/ai/Combat';

import { IsEnemyInRange } from './IsEnemyInRange';

export class IsEnemyInAggroRange extends IsEnemyInRange<Combat> {
  constructor(entities: Entity[]) {
    super(entities, Combat, 'aggroRange');
  }
}

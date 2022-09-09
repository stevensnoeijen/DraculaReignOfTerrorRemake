
import { IsEnemyInRange } from './IsEnemyInRange';

import { Combat } from '~/game/components/ai/Combat';

export class IsEnemyInAttackRange extends IsEnemyInRange<Combat> {
  constructor() {
    super(Combat, 'attackRange');
  }
}

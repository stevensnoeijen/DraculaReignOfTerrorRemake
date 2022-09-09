
import { IsEnemyInRange } from './IsEnemyInRange';

import { Combat } from '~/game/components/ai/Combat';


export class IsEnemyInAggroRange extends IsEnemyInRange<Combat> {
  constructor() {
    super(Combat, 'aggroRange');
  }
}

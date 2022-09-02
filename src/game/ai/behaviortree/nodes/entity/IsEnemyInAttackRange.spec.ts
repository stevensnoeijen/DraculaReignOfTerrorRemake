import { Combat } from '../../../../components/ai/Combat';

import { IsEnemyInAttackRange } from './IsEnemyInAttackRange';

describe('IsEnemyInAttackRange', () => {
  it('should set range to 16', () => {
    const node = new IsEnemyInAttackRange([]);

    expect(node['componentConstructor']).toBe(Combat);
    expect(node['componentProperty']).toBe('attackRange');
  });
});

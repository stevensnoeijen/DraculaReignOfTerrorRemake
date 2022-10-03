import { Combat } from '../../../../components/ai/Combat';

import { IsEnemyInAttackRange } from './IsEnemyInAttackRange';

describe('IsEnemyInAttackRange', () => {
  it('should set component properties', () => {
    const node = new IsEnemyInAttackRange();

    expect(node['componentConstructor']).toBe(Combat);
    expect(node['componentProperty']).toBe('attack');
  });
});

import { Combat } from '../../../../components/ai/Combat';

import { IsEnemyInAggroRange } from './IsEnemyInAggroRange';

describe('IsEnemyInAggroRange', () => {
  describe('constructor', () => {
    it('should set range to 100', () => {
      const node = new IsEnemyInAggroRange([]);

      expect(node['componentConstructor']).toBe(Combat);
      expect(node['componentProperty']).toBe('aggroRange');
    });
  });
});

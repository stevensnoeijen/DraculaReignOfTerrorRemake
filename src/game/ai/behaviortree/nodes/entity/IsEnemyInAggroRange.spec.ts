import { AttackComponent } from '../../../../systems/AttackComponent';
import { IsEnemyInAggroRange } from './IsEnemyInAggroRange';

describe('IsEnemyInAggroRange', () => {
  describe('constructor', () => {
    it('should set range to 100', () => {
      const node = new IsEnemyInAggroRange([]);

      expect(node['componentConstructor']).toBe(AttackComponent);
      expect(node['componentProperty']).toBe('aggroRange');
    });
  });
});

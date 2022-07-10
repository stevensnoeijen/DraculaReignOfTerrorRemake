import { AttackComponent } from '../../../../systems/AttackComponent';
import { IsEnemyInAttackRange } from './IsEnemyInAttackRange';

describe('IsEnemyInAttackRange', () => {
    it('should set range to 16', () => {
        const node = new IsEnemyInAttackRange([]);

        expect(node['componentConstructor']).toBe(AttackComponent);
        expect(node['componentProperty']).toBe('attackRange');
    });
});
import { IsEnemyInAttackRange } from './IsEnemyInAttackRange';

jest.mock('./utils');

describe('IsEnemyInAttackRange', () => {
    it('should set range to 16', () => {
        const node = new IsEnemyInAttackRange([]);

        expect(node['range']).toBe(16);
    });
});
import { IsEnemyInAggroRange } from './IsEnemyInAggroRange';

jest.mock('./utils');

describe('IsEnemyInAggroRange', () => {
    describe('constructor', () => {
        it('should set range to 100', () => {
            const node = new IsEnemyInAggroRange([]);

            expect(node['range']).toBe(100);
        });
    });
});
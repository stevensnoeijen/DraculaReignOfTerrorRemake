import { Health } from './Health';

describe('Health', () => {
  describe('takeHit', () => {
    it('should subtract damage from health', () => {
      const health = new Health({
        points: 100,
        maxPoints: 100,
      });

      health.takeHit(10);

      expect(health.points).toEqual(90);
    });
  });
});

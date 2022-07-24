import { HealthComponent } from './HealthComponent';
describe('HealthComponent', () => {
  describe('takeHit', () => {
    it('should subtract damage from health', () => {
      const component = new HealthComponent({
        points: 100,
      });

      component.takeHit(10);

      expect(component.points).toEqual(90);
    });
  });
});

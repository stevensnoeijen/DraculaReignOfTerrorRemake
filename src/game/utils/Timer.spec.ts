import { GameTime } from '../GameTime';

import { Timer } from './Timer';

describe('Timer', () => {
  describe('isElapsed', () => {
    const successProps = {
      delay: 1000,
    };

    it('should return false if time is higher than 0', () => {
      const timer = new Timer({
        ...successProps,
      });

      expect(timer.isElapsed()).toBe(false);
    });

    it('should return true if time is 0', () => {
      const timer = new Timer({
        ...successProps,
      });
      GameTime.delta = 1000;
      timer.update();

      expect(timer.isElapsed()).toBe(true);
    });

    it('should return true if time is lower than 0', () => {
      const timer = new Timer({
        ...successProps,
      });
      GameTime.delta = 1100;
      timer.update();

      expect(timer.isElapsed()).toBe(true);
    });
  });
});

import { GameTime } from './../../../../GameTime';
import { State } from '../Node';
import { Always } from './Always';
import { Timer } from './Timer';

describe('Timer', () => {
  const successChildren = [new Always(State.SUCCESS)];
  const successProps = {
    delay: 1000,
    children: successChildren,
  };

  describe('constructor', () => {
    it('should set values', () => {
      const elapsedCallback = () => {};
      const timer = new Timer({
        ...successProps,
        elapsedCallback,
      });

      expect(timer.delay).toBe(1000);
      expect(timer.countdownTimer).toBe(1000);
      expect(timer.elapsedCallback).toEqual(elapsedCallback);
      expect(timer.children).toHaveLength(1);
    });

    it('should set defaults', () => {
      const timer = new Timer({
        delay: 1000,
      });

      expect(timer.delay).toBe(1000);
      expect(timer.countdownTimer).toBe(1000);
      expect(timer.elapsedCallback).toBeNull();
    });
  });

  describe('isElapsed', () => {
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
      timer.evaluate();

      expect(timer.isElapsed()).toBe(true);
    });

    it('should return true if time is lower than 0', () => {
      const timer = new Timer({
        ...successProps,
      });
      GameTime.delta = 1100;
      timer.evaluate();

      expect(timer.isElapsed()).toBe(true);
    });
  });

  describe('reset', () => {
    it('should set countdownTimer to the given delay', () => {
      const timer = new Timer(successProps);
      GameTime.delta = 500;
      timer.evaluate();

      timer.reset();

      expect(timer.countdownTimer).toEqual(1000);
    });
  });

  describe('evaluate', () => {
    it('should return failure if it has no children', () => {
      const timer = new Timer({
        delay: 1000,
      });

      expect(timer.evaluate()).toEqual(State.FAILURE);
    });

    it('should be running and time subtracted when called', () => {
      const timer = new Timer(successProps);
      GameTime.delta = 100;

      expect(timer.evaluate()).toBe(State.RUNNING);
      expect(timer.countdownTimer).toEqual(900);
    });

    it('should evaluate first child when time is elapsed', () => {
      const timer = new Timer({
        delay: 1000,
        children: [new Always(State.SUCCESS), new Always(State.FAILURE)],
      });
      GameTime.delta = 1000;

      expect(timer.evaluate()).toEqual(State.SUCCESS);
    });

    it('should call endedCallback when time is elapsed', () => {
      const elapsedCallback = jest.fn();
      const timer = new Timer({
        ...successProps,
        elapsedCallback,
      });
      GameTime.delta = 1000;

      timer.evaluate();

      expect(elapsedCallback).toBeCalled();
    });

    it('should set countdownTimer when evalated', () => {
      const timer = new Timer(successProps);
      GameTime.delta = 1000;

      timer.evaluate();

      expect(timer.countdownTimer).toEqual(0);
    });
  });
});

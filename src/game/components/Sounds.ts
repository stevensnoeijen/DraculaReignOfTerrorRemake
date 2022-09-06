
import { Action, SoundController } from '../sounds/SoundController';

export class Sounds {
  constructor(
    private readonly soundController: SoundController
  ) {}

  public play(action: Action) {
    this.soundController.play(action);
  }

  public stop() {
    this.soundController.stop();
  }
}

import { Sound as PixiSound } from '@pixi/sound';

import { getRandomValue } from '~/utils/array';

export type Action = 'command' | 'attackEffect' | 'dead' | 'deadByCatapult';

const REPEATABLE_ACTION: Action = 'attackEffect';

export class SoundController {
  private currentlyPlayingAction: Action|null = null;

  constructor(
    private readonly pixiSound: PixiSound,
    private readonly translations: Map<Action, string[] | undefined>,
  ) {}

  public play(action: Action) {
    if (this.currentlyPlayingAction != null)
      this.stop();

    const translations = this.translations.get(action);
    if (translations == null || translations.length === 0)
      return;

    const alias = getRandomValue(translations);
    if (alias == undefined) return;

    this.currentlyPlayingAction = action;
    this.pixiSound.play(alias, this.callback(action));
  }

  public stop() {
    if (this.isCurrentlyPlayingStoppable()) {
      this.pixiSound.stop();
      this.currentlyPlayingAction = null;
    }
  }

  private isCurrentlyPlayingStoppable() {
    return this.currentlyPlayingAction !== 'command';
  }

  private callback (action: Action) {
    return () => {
      if (action === REPEATABLE_ACTION) {
        this.play(action);
        return;
      }

      this.currentlyPlayingAction = null;
    };
  }
}

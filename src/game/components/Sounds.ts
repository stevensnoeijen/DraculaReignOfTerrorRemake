import { Sound as PixiSound } from '@pixi/sound';

import { getRandomValue } from '~/utils/array';

export type Action = 'command' | 'attackEffect' | 'dead' | 'deadByCatapult';

export class Sounds {
  constructor(
    private readonly pixiSound: PixiSound,
    private readonly translations: Map<Action, string[] | undefined>,
  ) {}

  public play(action: Action) {
    const translations = this.translations.get(action);
    if (translations == null || translations.length === 0)
      return;

      const alias = getRandomValue(translations);
    if (alias == undefined) return;

    this.pixiSound.play(alias);
  }
}

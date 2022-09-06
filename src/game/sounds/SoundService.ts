import { Sound as PixiSound } from '@pixi/sound';

import { Action, Sounds } from '../components/Sounds';
import { Unit } from '../objects/Unit';

export class SoundService {
  constructor(
    private readonly pixiSound: PixiSound,
  ) {}

  public createComponent(unit: Unit): Sounds {
    return new Sounds(
      this.pixiSound,
      this.getTranslations(unit),
    );
  }

  private getTranslations(unit: Unit): Map<Action, string[] | undefined> {
    return new Map([
      ['command', unit.soundCommand],
      ['attackEffect', unit.soundAttackEffect],
      ['dead', unit.soundDead],
      [
        'deadByCatapult',
        unit.soundDeadByCatapult != null ? [unit.soundDeadByCatapult] : []
      ],
    ]);
  }
}

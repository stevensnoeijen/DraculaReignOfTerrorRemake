import { Sound as PixiSound } from '@pixi/sound';

import { Sounds } from '../components/Sounds';
import { Unit } from '../data/Unit';

import { Action, SoundController } from './SoundController';

export class SoundService {
  constructor(
    private readonly pixiSound: PixiSound,
  ) {}

  public createComponent(unit: Unit): Sounds {
    return new Sounds(this.getSoundController(unit));
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

  private getSoundController (unit: Unit) {
    return new SoundController(
      this.pixiSound,
      this.getTranslations(unit)
    );
  }
}

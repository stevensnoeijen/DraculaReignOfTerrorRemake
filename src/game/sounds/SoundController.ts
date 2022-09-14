import { Sound as PixiSound } from '@pixi/sound';

import { SoundInstance } from './SoundInstance';

export type Action = 'command' | 'attackEffect' | 'dead' | 'deadByCatapult';

const REPEATABLE_ACTION: Action = 'attackEffect';
const UNSTOPPABLE_ACTION: Action = 'command';

export class SoundController {
  private actionToSoundInstanceSet: Map<Action, Set<SoundInstance>> = new Map();

  constructor(
    private readonly pixiSound: PixiSound,
    private readonly actionToSprites: Map<Action, string[] | undefined>
  ) {}

  public play(action: Action) {
    const sound = new SoundInstance(
      this.pixiSound,
      this.getSprites(action),
      action !== UNSTOPPABLE_ACTION,
      action === REPEATABLE_ACTION
    );
    this.addActionToSoundInstanceSet(action, sound);
    sound.play(() => this.removeActionToSoundInstanceSet(action, sound));
  }

  public stop(action: Action) {
    const sounds = this.actionToSoundInstanceSet.get(action);
    if (sounds != null) {
      sounds.forEach((sound) => sound.stop());
      sounds.clear();
    }
  }

  private getSprites(action: Action) {
    return this.actionToSprites.get(action) ?? [];
  }

  private addActionToSoundInstanceSet(
    action: Action,
    soundInstance: SoundInstance
  ) {
    if (!this.actionToSoundInstanceSet.has(action))
      this.actionToSoundInstanceSet.set(action, new Set());

    this.actionToSoundInstanceSet.get(action)!.add(soundInstance);
  }

  private removeActionToSoundInstanceSet(
    action: Action,
    soundInstance: SoundInstance
  ) {
    if (this.actionToSoundInstanceSet.has(action))
      this.actionToSoundInstanceSet.get(action)!.delete(soundInstance);
  }
}

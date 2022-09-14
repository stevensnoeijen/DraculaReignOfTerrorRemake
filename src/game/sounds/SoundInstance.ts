import { IMediaInstance, Sound as PixiSound } from '@pixi/sound';
import { noop } from 'lodash';

import { getRandomValue } from './../../utils/array';

import { ArrayMinLength } from '~/utils/types';

export type DoneCallback = (soundInstance: SoundInstance) => void;

export class SoundInstance {
  private mediaInstance: IMediaInstance | null = null;
  private doneCallback: DoneCallback = noop;

  constructor(
    private readonly pixiSound: PixiSound,
    private readonly sprites: string[],
    private readonly isStoppable: boolean,
    private readonly repeat: boolean
  ) {}

  play(doneCallback: DoneCallback): void {
    if (this.mediaInstance != null) throw new Error('Sound already playing');

    if (this.sprites.length < 1) {
      doneCallback(this);
      return; // nothing to play
    }
    const sprite = this.getRandomSprite();
    if (sprite == undefined) {
      doneCallback(this);
      return;
    }

    this.doneCallback = doneCallback;
    Promise.resolve(this.pixiSound.play(sprite, this.callback.bind(this))).then(
      (value) => (this.mediaInstance = value)
    );
  }

  stop() {
    if (this.isStoppable) {
      this.mediaInstance?.stop();
      this.doneCallback(this);
    }
  }

  private getRandomSprite() {
    return getRandomValue(this.sprites as ArrayMinLength<string, 1>);
  }

  private callback() {
    if (this.repeat) {
      this.replay();
      return;
    }

    this.doneCallback(this);
  }

  private replay() {
    this.mediaInstance = null;
    this.play(this.doneCallback);
  }
}

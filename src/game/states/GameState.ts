import { ITransitionActions, State } from 'sim-ecs';
import { Sound as PixiSound } from '@pixi/sound';

import { Engine } from '../Engine';
import { EntityLoader } from '../EntityLoader';
import { AnimationModelsJson } from '../animation/api';
import { ObjectsJson } from '../data/ObjectsJson';

import { SoundService } from './../sounds/SoundService';
import { AnimationService } from './../animation/AnimationService';


export class GameState extends State {

  activate(actions: ITransitionActions): void | Promise<void> {
    const engine = actions.getResource(Engine);
    if (engine.scenario == null) {
      throw new Error('No scenario loaded');
    }

    engine.scenario.load(this.getEntityLoader(actions, engine));
  }

  private getAnimationService (engine: Engine) {
    return new AnimationService(
      engine.app.loader.resources['unit-spritesheet'].spritesheet!,
      engine.app.loader.resources['animation-models'].data as AnimationModelsJson
    );
  }

  private getSoundService (engine: Engine) {
    const sounds = PixiSound.from({
      url: 'assets/sounds.mp3',
      sprites: (engine.app.loader.resources['sounds'].data as audiosprite.Result).spritemap,
    });

    return new SoundService(
      sounds,
    );
  }

  private getEntityLoader(actions: ITransitionActions, engine: Engine) {
    return new EntityLoader(
      actions,
      engine.app.loader.resources['objects'].data as ObjectsJson,
      this.getAnimationService(engine),
      this.getSoundService(engine),
    );
  }
}

import { ITransitionActions, State } from 'sim-ecs';
import { Sound as PixiSound } from '@pixi/sound';

import { Engine } from '../Engine';
import { EntityLoader } from '../EntityLoader';
import { Events } from '../Events';
import { AnimationModelsJson } from '../animation/api';

import { ObjectsJson } from './../objects/ObjectsJson';
import { SoundService } from './../sounds/SoundService';
import { EventBus } from './../EventBus';
import { AnimationService } from './../animation/AnimationService';


export class GameState extends State {

  activate(actions: ITransitionActions): void | Promise<void> {
    const engine = actions.getResource(Engine);
    if (engine.scenario == null) {
      throw new Error('No scenario loaded');
    }
    engine.scenario.load(this.getEntityLoader(actions, engine));

    const eventBus = actions.getResource(EventBus<Events>);
    // TODO: remove temp solution for register listener in MouseControlledSystem
    setTimeout(() => {
      eventBus.emit('scenario:loaded', {
        scenario: engine.scenario!
      });
    }, 100);
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

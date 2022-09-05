import { ITransitionActions, State } from 'sim-ecs';

import { Engine } from '../Engine';
import { EntityLoader } from '../EntityLoader';
import { Events } from '../Events';
import { AnimationModelsJson } from '../animation/api';

import { EventBus } from './../EventBus';
import { AnimationService } from './../animation/AnimationService';


export class GameState extends State {

  activate(actions: ITransitionActions): void | Promise<void> {
    const engine = actions.getResource(Engine);
    if (engine.scenario == null) {
      throw new Error('No scenario loaded');
    }

    const animationService = new AnimationService(
      engine.app.loader.resources['unit-spritesheet'].spritesheet!,
      engine.app.loader.resources['animation-models'].data as AnimationModelsJson
    );
    const entityLoader = new EntityLoader(actions, animationService);

    engine.scenario.load(entityLoader);

    const eventBus = actions.getResource(EventBus<Events>);

    // TODO: remove temp solution for register listener in MouseControlledSystem
    setTimeout(() => {
      eventBus.emit('scenario:loaded', {
        scenario: engine.scenario!
      });
    }, 100);
  }
}

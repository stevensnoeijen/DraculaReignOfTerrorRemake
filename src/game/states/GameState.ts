import { ITransitionActions, State } from 'sim-ecs';

import { Engine } from '../Engine';
import { EntityLoader } from '../EntityLoader';
import { Events } from '../Events';

import { EventBus } from './../EventBus';


export class GameState extends State {

  activate(actions: ITransitionActions): void | Promise<void> {
    const engine = actions.getResource(Engine);
    const entityLoader = new EntityLoader(actions, engine.animationService);
    engine.scenario!.load(entityLoader);

    const eventBus = actions.getResource(EventBus<Events>);

    // TODO: remove temp solution for register listener in MouseControlledSystem
    setTimeout(() => {
      eventBus.emit('scenario:loaded', {
        scenario: engine.scenario!
      });
    }, 100);
  }
}

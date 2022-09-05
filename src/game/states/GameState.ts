import { ITransitionActions, State } from 'sim-ecs';

import { Engine } from '../Engine';
import { EntityLoader } from '../EntityLoader';


export class GameState extends State {

  activate(actions: ITransitionActions): void | Promise<void> {
    const engine = actions.getResource(Engine);
    const entityLoader = new EntityLoader(actions, engine.animationService);
    engine.scenario!.load(entityLoader);
  }
}

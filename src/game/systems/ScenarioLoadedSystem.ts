import { Actions, createSystem, ReadResource } from 'sim-ecs';

import { EventBus } from '../EventBus';
import { Engine } from '../Engine';


export const ScenarioLoadedSystem = createSystem({
    eventBus: ReadResource(EventBus),
    actions: Actions,
  })
  .withSetupFunction(({ eventBus, actions }) => {
    const engine = actions.getResource(Engine);

    eventBus.emit('scenario:loaded', {
      scenario: engine.scenario!
    });
  })
  .build();

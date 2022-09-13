import {
  createSystem,
  WriteEvents,
  Actions,
  Read,
  queryComponents,
  ReadEntity,
} from 'sim-ecs';

import { Died } from '../events/Died';
import {
  Follow,
  MoveVelocity,
  Target,
  Alive,
  Health,
  Selectable,
  Collision,
  Controlled,
  Combat,
  MovePath,
  BehaviorTree,
  Sensory,
} from '../components';

const DEAD_COMPONENTS = [
  Health,
  Selectable,
  Collision,
  MoveVelocity,
  MovePath,
  Selectable,
  Controlled,
  Follow,
  Target,
  Combat,
  Sensory,
  BehaviorTree,
];

export const AliveSystem = createSystem({
  actions: Actions,
  died: WriteEvents(Died),
  query: queryComponents({
    entity: ReadEntity(),
    alive: Read(Alive),
  }),
})
  .withRunFunction(({ actions, died, query }) => {
    query.execute(({ entity, alive }) => {
      if (alive.isAlive()) {
        return;
      }

      DEAD_COMPONENTS.forEach((component) => entity.removeComponent(component));
      actions.commands.maintain();
      died.publish(new Died(entity));
    });
  })
  .build();

import {
  createSystem,
  WriteEvents,
  queryEntities,
  With,
  Actions,
} from 'sim-ecs';

import { Died } from '../events/Died';
import {
  Follow,
  MoveVelocity,
  Target,
  Alive,
  Health,
  Selectable,
  Collider,
  Size,
  Controlled,
  Combat,
  MovePath,
  BehaviorTree,
  Sensory,
} from '../components';

const DEAD_COMPONENTS = [
  Health,
  Selectable,
  Collider,
  Size,
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
  query: queryEntities(With(Alive), With(Health)),
})
  .withRunFunction(({ actions, died, query }) => {
    query.execute((entity) => {
      const alive = entity.getComponent(Alive)!;
      if (alive.isAlive() || !entity.hasComponent(Health)) {
        return;
      }

      DEAD_COMPONENTS.forEach((component) => entity.removeComponent(component));
      actions.commands.maintain();
      died.publish(new Died(entity));
    });
  })
  .build();

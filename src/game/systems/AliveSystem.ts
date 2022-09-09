import { createSystem, WriteEvents, queryEntities, With } from 'sim-ecs';

import { Alive } from '../components/Alive';
import { Health } from '../components/Health';
import { Selectable } from '../components/input/Selectable';
import { Died } from '../events/Died';

export const AliveSystem = createSystem({
    died: WriteEvents(Died),
    query: queryEntities(With(Alive), With(Health)),
  }).withRunFunction(({
    died,
    query
  }) => {
    query.execute((entity) => {
      const alive = entity.getComponent(Alive)!;
      const health = entity.getComponent(Health);
      if (alive.isAlive() || health == null) {
        return;
      }

      entity.removeComponent(Health);
      entity.removeComponent(Selectable);

      died.publish(new Died(entity));
    });
  })
  .build();

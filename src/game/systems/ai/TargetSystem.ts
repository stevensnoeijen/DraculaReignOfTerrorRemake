import { createSystem, queryComponents, Write, WriteEvents, ReadEntity } from 'sim-ecs';

import { isAlive } from '../../utils/index';

import { Target } from '~/game/components/ai/Target';
import { Idled } from '~/game/events/Idled';

export const TargetSystem = createSystem({
  idled: WriteEvents(Idled),

  query: queryComponents({
    entity: ReadEntity(),
    target: Write(Target),
  }),
})
.withRunFunction(({
  idled: stoppedAttacking,
  query
}) => {
  query.execute(({ entity, target }) => {
    if (target.entity === null) {
      return;
    }

    if (!isAlive(target.entity)) {
      target.entity = null;
      stoppedAttacking.publish(new Idled(entity));
    }
  });
})
.build();

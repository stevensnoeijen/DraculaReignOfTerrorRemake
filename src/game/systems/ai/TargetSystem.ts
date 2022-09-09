import { createSystem, queryComponents, Write, WriteEvents, ReadEntity } from 'sim-ecs';

import { Target } from '~/game/components/ai/Target';
import { Idled } from '~/game/events/Idled';
import { isAlive } from '~/game/utils/components';

export const TargetSystem = createSystem({
  idled: WriteEvents(Idled),

  query: queryComponents({
    entity: ReadEntity(),
    target: Write(Target),
  }),
})
.withRunFunction(({
  idled,
  query
}) => {
  query.execute(({ entity, target }) => {
    if (target.entity === null) {
      return;
    }

    if (!isAlive(target.entity)) {
      target.entity = null;
      idled.publish(new Idled(entity));
    }
  });
})
.build();

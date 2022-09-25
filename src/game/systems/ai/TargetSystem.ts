import {
  createSystem,
  queryComponents,
  Write,
  WriteEvents,
  ReadEntity,
} from 'sim-ecs';

import { AttackStopped } from '../../events/AttackStopped';

import { Target } from '~/game/components/ai/Target';
import { isAlive } from '~/game/utils/components';
import { UnitState } from '~/game/components';

export const TargetSystem = createSystem({
  attackStopped: WriteEvents(AttackStopped),

  query: queryComponents({
    entity: ReadEntity(),
    target: Write(Target),
    state: Write(UnitState),
  }),
})
  .withRunFunction(({ attackStopped, query }) => {
    return query.execute(({ entity, target, state }) => {
      if (target.entity === null) {
        return;
      }

      if (!isAlive(target.entity)) {
        target.entity = null;

        attackStopped.publish(new AttackStopped(entity));
        state.state = 'idle';
      }
    });
  })
  .build();

import { createSystem, queryComponents, Write, WriteEvents, ReadEntity } from 'sim-ecs';

import { StoppedAttacking } from './../../events/StoppedAttacking';
import { isAlive } from './../utils/index';

import { Target } from '~/game/components/ai/Target';

export const TargetSystem = createSystem({
  stoppedAttacking: WriteEvents(StoppedAttacking),

  query: queryComponents({
    entity: ReadEntity(),
    target: Write(Target),
  }),
})
.withRunFunction(({
  stoppedAttacking,
  query
}) => {
  query.execute(({ entity, target }) => {
    if (target.entity === null) {
      return;
    }

    if (!isAlive(target.entity)) {
      target.entity = null;
      stoppedAttacking.publish(new StoppedAttacking(entity));
    }
  });
})
.build();

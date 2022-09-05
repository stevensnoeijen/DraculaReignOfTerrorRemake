import { createSystem, queryComponents, Write, WriteEvents } from 'sim-ecs';


import { BehaviorTree } from '../../components/ai/BehaviorTree';

import { StartedAttacking } from './../../events/StartedAttacking';

import { StoppedAttacking } from '~/game/events/StoppedAttacking';
import { UnitState } from '~/game/components/UnitState';

export const BehaviorTreeSystem = createSystem({
  startedAttacking: WriteEvents(StartedAttacking),
  stoppedAttacking: WriteEvents(StoppedAttacking),

  query: queryComponents({
    behaviorTree: Write(BehaviorTree),
    unitState: Write(UnitState),
  }),
})
.withRunFunction(({
  startedAttacking,
  stoppedAttacking,

  query
}) => {
  query.execute(({ behaviorTree }) => {
    behaviorTree.tree.update();

    for(const event of behaviorTree.events) {
       if (event instanceof StartedAttacking) {
        startedAttacking.publish(event);
        continue;
      }
      if (event instanceof StoppedAttacking) {
        stoppedAttacking.publish(event);
        continue;
      }
      console.warn('Event not handled', event);
    }
    behaviorTree.clearEvents();
  });
})
.build();

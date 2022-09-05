import { createSystem, queryComponents, Read, WriteEvents } from 'sim-ecs';


import { BehaviorTree } from '../../components/ai/BehaviorTree';

import { StartedAttacking } from './../../events/StartedAttacking';

import { StoppedAttacking } from '~/game/events/StoppedAttacking';

export const BehaviorTreeSystem = createSystem({
  startedAttacking: WriteEvents(StartedAttacking),
  stoppedAttacking: WriteEvents(StoppedAttacking),

  query: queryComponents({
    behaviorTree: Read(BehaviorTree),
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
        return startedAttacking.publish(event);
      }
      if (event instanceof StoppedAttacking) {
        return stoppedAttacking.publish(event);
      }
      console.warn('Event not handled', event);
    }
    behaviorTree.clearEvents();
  });
})
.build();

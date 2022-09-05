import { createSystem, queryComponents, Write, WriteEvents } from 'sim-ecs';


import { BehaviorTree } from '../../components/ai/BehaviorTree';


import { UnitState } from '~/game/components/UnitState';
import { EntityEvent } from '~/game/events/EntityEvent';

export const BehaviorTreeSystem = createSystem({
  events: WriteEvents(EntityEvent),

  query: queryComponents({
    behaviorTree: Write(BehaviorTree),
    unitState: Write(UnitState),
  }),
})
.withRunFunction(({
  events,
  query
}) => {
  query.execute(({ behaviorTree }) => {
    behaviorTree.tree.update();

    for(const event of behaviorTree.events) {
       if (event instanceof EntityEvent) {
        events.publish(event);
        continue;
      }
      console.warn('Event not handled', event);
    }
    behaviorTree.clearEvents();
  });
})
.build();

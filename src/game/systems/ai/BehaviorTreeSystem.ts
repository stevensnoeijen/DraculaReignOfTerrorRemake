import { createSystem, queryComponents, Read } from 'sim-ecs';

import { BehaviorTree } from '../../components/ai/BehaviorTree';

export const BehaviorTreeSystem = createSystem({
  query: queryComponents({
    behaviorTree: Read(BehaviorTree),
  }),
})
.withRunFunction(({
  query
}) => {
  query.execute(({ behaviorTree }) => {
    behaviorTree.tree.update();
  });
})
.build();

import { createSystem, queryComponents, Read, ReadResource, Write } from 'sim-ecs';

import { astar } from '../../ai/navigation/astar';
import { ScenarioLoadedEvent } from '../../Events';
import { convertPathfindingPathToPositions } from '../../utils';
import { Transform } from '../../components/Transform';
import { MovePath } from '../../components/movement/MovePath';
import { Follow } from '../../components/ai/Follow';


import { EventBus } from '~/game/EventBus';
import { Target } from '~/game/components/ai/Target';

let collsionMap: number[][] | null = null;

export const FollowSystem = createSystem({
  eventBus: ReadResource(EventBus),
  query: queryComponents({
    follow: Read(Follow),
    target: Write(Target),

    transform: Read(Transform),
    movePath: Write(MovePath),
  }),
})
.withSetupFunction(({ eventBus }) => {
  eventBus.on<ScenarioLoadedEvent>('scenario:loaded', (event) => {
    collsionMap = event.detail.scenario.collisionMap;
  });
})
.withRunFunction(({
  query
}) => {
  if (collsionMap === null)
    return;

  query.execute(({ follow, transform, movePath }) => {
    if (follow.entity == null || movePath.path.length !== 0) {
      return;
    }

    const path = astar(
      collsionMap!, transform.gridPosition,
      follow.entity.getComponent(Transform)!.gridPosition,
    );

    movePath.path = convertPathfindingPathToPositions(
      path.slice(1).slice(0, -1)
    );
  });
})
.build();

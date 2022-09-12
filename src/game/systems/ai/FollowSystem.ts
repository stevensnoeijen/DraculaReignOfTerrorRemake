import { createSystem, queryComponents, Read, Write } from 'sim-ecs';

import { astar } from '../../ai/navigation/astar';
import { convertPathfindingPathToPositions } from '../../utils/grid';
import { Transform } from '../../components/Transform';
import { MovePath } from '../../components/movement/MovePath';
import { Follow } from '../../components/ai/Follow';

import { Target } from '~/game/components/ai/Target';
import { worldEventBus } from '~/game/constants';
import { ScenarioLoaded } from '~/game/events/ScenarioLoaded';

let collsionMap: number[][] | null = null;

export const FollowSystem = createSystem({
  query: queryComponents({
    follow: Read(Follow),
    target: Write(Target),

    transform: Read(Transform),
    movePath: Write(MovePath),
  }),
})
  .withSetupFunction(() => {
    worldEventBus.subscribe(ScenarioLoaded, (event) => {
      collsionMap = event.scenario.collisionMap;
    });
  })
  .withRunFunction(({ query }) => {
    if (collsionMap === null) return;

    query.execute(({ follow, transform, movePath }) => {
      if (follow.entity == null || movePath.path.length !== 0) {
        return;
      }

      const path = astar(
        collsionMap!,
        transform.gridPosition,
        follow.entity.getComponent(Transform)!.gridPosition
      );

      movePath.path = convertPathfindingPathToPositions(
        path.slice(1).slice(0, -1)
      );
    });
  })
  .build();

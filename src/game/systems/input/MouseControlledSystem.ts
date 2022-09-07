import { createSystem, queryComponents, Read, ReadResource, Write, WriteOptional, ReadEntity, WriteEvents } from 'sim-ecs';

import { astar } from '../../ai/navigation/astar';
import { Input } from '../../Input';
import { Selectable } from '../../components/input/Selectable';
import { Transform } from '../../components/Transform';
import { convertPathfindingPathToPositions, getMouseGridPosition } from '../../utils/grid';
import { ScenarioLoadedEvent } from '../../Events';
import { getEntityAtPosition } from '../../utils/entity';
import { MovePath } from '../../components/movement/MovePath';
import { Follow } from '../../components/ai/Follow';
import { Controlled } from '../../components/input/Controlled';


import { EventBus } from '~/game/EventBus';
import { MouseControlled } from '~/game/components/input/MouseControlled';
import { Commanded } from '~/game/events/Commanded';

let collsionMap: number[][] | null = null;

export const MouseControlledSystem = createSystem({
  commanded: WriteEvents(Commanded),
  eventBus: ReadResource(EventBus),
  query: queryComponents({
    entity: ReadEntity(),
    selectable: Read(Selectable),
    transform: Read(Transform),
    mouseControlled: Read(MouseControlled),
    movePath: Write(MovePath),
    follow: WriteOptional(Follow),
    controlled: WriteOptional(Controlled),
  }),
})
.withSetupFunction(({ eventBus }) => {
  eventBus.on<ScenarioLoadedEvent>('scenario:loaded', (event) => {
    collsionMap = event.detail.scenario.collisionMap;
  });
})
.withRunFunction(({
  commanded,
  query
}) => {
  if (!Input.isMouseButtonUp(2) && !Input.isMouseDblClick())
    return;

  if (collsionMap === null)
    return;

  const entities = Array.from(query.iter()).map(e => e.entity);

  query.execute(({ entity, selectable, transform, movePath, follow, controlled }) => {
    if (!selectable.isSelected()) return;

    const clickedEntity = getEntityAtPosition(
      entities,
      Input.mousePosition.x,
      Input.mousePosition.y
    );
    if (clickedEntity != null) {
      if (follow != null) {
        follow.entity = clickedEntity;
        return;
      }
    }

    // unfollow
    if (follow != null && follow.entity != null) {
      follow.entity = null;
    }

    const path = astar(
      collsionMap!,
      transform.gridPosition,
      getMouseGridPosition()
    );

    movePath.path = convertPathfindingPathToPositions(
      path.slice(1)
    );

    if (controlled != null) {
      controlled.by = 'player';
    }

    commanded.publish(new Commanded(entity));
  });
})
.build();

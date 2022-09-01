import { createSystem, queryComponents, Read, ReadResource, Write, WriteOptional } from 'sim-ecs';

import { astar } from '../../ai/pathfinding';
import { Input } from '../../Input';
import { Selectable } from '../../components/player/Selectable';
import { Transform } from '../../components/Transform';
import { convertPathfindingPathToPositions, getMouseGridPosition } from '../../utils';
import { ScenarioLoadedEvent } from '../../Events';
import { getEntityAtPosition } from '../utils';
import { MovePath } from '../../components/movement/MovePath';
import { Follow } from '../../components/ai/Follow';

import { EcsyEntity } from './../../components/EcsyEntity';
import { ControlledComponent } from './../ControlledComponent';

import { EventBus } from '~/game/EventBus';
import { MouseControlled } from '~/game/components/input/MouseControlled';

let collsionMap: number[][] | null = null;

export const MouseControlledSystem = createSystem({
  eventBus: ReadResource(EventBus),
  query: queryComponents({
    ecsyEntity: Read(EcsyEntity),
    selectable: Read(Selectable),
    transform: Read(Transform),
    mouseControlled: Read(MouseControlled),
    movePath: Write(MovePath),
    follow: WriteOptional(Follow),
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
  if (!Input.isMouseButtonUp(2) && !Input.isMouseDblClick())
    return;

  if (collsionMap === null)
    return;

  const entities = Array.from(query.iter()).map(e => e.ecsyEntity.entity);

  query.execute(({ selectable, transform, ecsyEntity, movePath, follow }) => {
    if (!selectable.selected)
      return;

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

    if (ecsyEntity.entity.hasComponent(ControlledComponent)) {
      ecsyEntity.entity.getMutableComponent(ControlledComponent)!.by = 'player';
    }
  });
})
.build();

import { Entity, System, World } from 'ecsy';

import { astar } from '../../ai/pathfinding';
import { LevelLoadedEvent } from '../../Events';
import { DefaultAttributes } from '../DefaultAttributes';
import { convertPathfindingPathToPositions } from '../../utils';
import { getSimComponent } from '../utils';
import { Transform } from '../../components/Transform';

import { FollowComponent } from './FollowComponent';
import { MovePathComponent } from './MovePathComponent';

export class FollowSystem extends System {
  public static queries = {
    entities: {
      components: [FollowComponent],
      listen: {
        changed: true,
      },
    },
  };

  private map: number[][] | null = null;

  constructor(world: World, attributes: DefaultAttributes) {
    super(world, attributes);

    attributes.eventBus.on<LevelLoadedEvent>('level:loaded', (event) => {
      this.map = event.detail.level.collisionMap;
    });
  }

  public execute(delta: number, time: number): void {
    if ((this.queries.entities.changed ?? []).length > 0) {
      for (const entity of this.queries.entities.changed!) {
        this.updateFollowingEntity(entity);
      }
    }

    for (const entity of this.queries.entities.results) {
      if (
        entity.getComponent(FollowComponent)!.follow != null &&
        entity.getComponent(MovePathComponent)?.path != null
      ) {
        // when following and move-path is done
        this.updateFollowingEntity(entity);
      }
    }
  }

  private updateFollowingEntity(entity: Entity): void {
    const followComponent = entity.getComponent(FollowComponent)!;
    if (followComponent.follow == null) {
      return;
    }

    const transformComponent = getSimComponent(followComponent.follow, Transform)!;

    const path = astar(
      this.map!,
      getSimComponent(entity, Transform)!.gridPosition,
      transformComponent.gridPosition
    );

    const movePathComponent = entity.getMutableComponent(MovePathComponent)!;
    movePathComponent.path = convertPathfindingPathToPositions(
      path.slice(1).slice(0, -1)
    ); // move to the other entity
  }
}

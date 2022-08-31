import { World } from 'ecsy';

import { astar } from '../../ai/pathfinding';
import { Input } from '../../Input';
import { Selectable } from '../../components/player/Selectable';
import { Transform } from '../../components/Transform';
import { PixiJsSystem } from '../PixiJsSystem';
import { getMouseGridPosition } from '../../utils';
import { LevelLoadedEvent } from '../../Events';
import { getEntityAtPosition } from '../utils';
import { MovePath } from '../../components/movement/MovePath';

import { getSimComponent } from './../utils/index';
import { SimEcsComponent } from './../SimEcsComponent';
import { ControlledComponent } from './../ControlledComponent';
import { FollowComponent } from './../movement/FollowComponent';
import { convertPathfindingPathToPositions } from './../../utils';
import { PlayerMovementMouseComponent } from './PlayerMovementMouseComponent';
import { DefaultAttributes } from './../DefaultAttributes';


export class PlayerMovementMouseSystem extends PixiJsSystem {
  public static queries = {
    playerEntities: {
      components: [PlayerMovementMouseComponent],
    },
    entities: {
      components: [SimEcsComponent],
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
    if (Input.isMouseButtonUp(2) || Input.isMouseDblClick()) {
      for (const entity of this.queries.playerEntities.results) {
        const selectableComponent = getSimComponent(entity, Selectable);
        if (!selectableComponent || !selectableComponent.selected) {
          continue;
        }

        const transformComponent = getSimComponent(entity, Transform);
        if (!transformComponent) {
          continue;
        }

        if (this.map != null) {
          const clickedEntity = getEntityAtPosition(
            this.queries.entities.results,
            Input.mousePosition.x,
            Input.mousePosition.y
          );
          if (clickedEntity != null) {
            const followComponent = entity.getMutableComponent(FollowComponent);
            if (followComponent != null) {
              followComponent.follow = clickedEntity;
              continue;
            }
          }

          // unfollow
          const followComponent = entity.getMutableComponent(FollowComponent);
          if (followComponent != null && followComponent.follow != null) {
            followComponent.follow = null;
          }

          const path = astar(
            this.map,
            transformComponent.gridPosition,
            getMouseGridPosition()
          );

          const movePathComponent = getSimComponent(entity, MovePath)!;
          movePathComponent.path = convertPathfindingPathToPositions(
            path.slice(1)
          );

          if (entity.hasComponent(ControlledComponent)) {
            entity.getMutableComponent(ControlledComponent)!.by = 'player';
          }
        }
      }
    }
  }
}

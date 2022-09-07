import { ISyncPointPrefab } from 'sim-ecs';

import {
  GameTimeSystem,
  InputSystem,
  TargetSystem,
  BehaviorTreeSystem,
  FollowSystem,
  KeyboardControlledSystem,
  MouseSelectionSystem,
  HealthSystem,
  MoveVelocitySystem,
  SpriteRenderSystem,
  MouseControlledSystem,
  AliveSystem,
  MovePositionDirectSystem,
  MovePathSystem,
  GridRenderSystem,
  GraphicsRenderSystem,
  UnitStateSystem,
  MapRenderSystem,
  SoundsSystem,
  AnimatorSystem,
  LoadScenarioSystem,
} from '../systems';

export const gameSchedule: ISyncPointPrefab = {
  stages: [
    [GameTimeSystem],
    [InputSystem],
    [MouseControlledSystem, KeyboardControlledSystem],
    [MouseSelectionSystem],
    [AliveSystem],
    [HealthSystem],
    [MoveVelocitySystem],
    [MovePositionDirectSystem],
    [MovePathSystem],
    [BehaviorTreeSystem, TargetSystem, FollowSystem, UnitStateSystem],
    [AnimatorSystem, SoundsSystem],
    [
      MapRenderSystem,
      GridRenderSystem,
      SpriteRenderSystem,
      GraphicsRenderSystem,
    ],
  ],
  after: {
    stages: [[LoadScenarioSystem]],
  },
};

import { ISyncPointPrefab } from 'sim-ecs';

import { GameTimeSystem } from '../systems/GameTimeSystem';
import { InputSystem } from '../systems/input/InputSystem';
import { TargetSystem } from '../systems/ai/TargetSystem';
import { BehaviorTreeSystem } from '../systems/ai/BehaviorTreeSystem';
import { FollowSystem } from '../systems/ai/FollowSystem';
import { KeyboardControlledSystem } from '../systems/input/KeyboardControlledSystem';
import { MouseSelectionSystem } from '../systems/input/MouseSelectionSystem';
import { HealthSystem } from '../systems/HealthSystem';
import { MoveVelocitySystem } from '../systems/movement/MoveVelocitySystem';
import { SpriteRenderSystem } from '../systems/pixi/SpriteRenderSystem';
import { MouseControlledSystem } from '../systems/input/MouseControlledSystem';
import { AliveSystem } from '../systems/AliveSystem';
import { MovePositionDirectSystem } from '../systems/movement/MovePositionDirectSystem';
import { MovePathSystem } from '../systems/movement/MovePathSystem';
import { GridRenderSystem } from '../systems/pixi/GridRenderSystem';
import { GraphicsRenderSystem } from '../systems/pixi/GraphicsRenderSystem';

import { AnimatorSystem } from './../systems/AnimatorSystem';

export const gameSchedule: ISyncPointPrefab = {
  stages: [
    [GameTimeSystem],
    [InputSystem],
    [
      MouseControlledSystem,
      KeyboardControlledSystem,
    ],
    [MouseSelectionSystem],
    [AliveSystem],
    [HealthSystem],
    [MoveVelocitySystem],
    [MovePositionDirectSystem],
    [MovePathSystem],
    [
      BehaviorTreeSystem,
      TargetSystem,
      FollowSystem,
    ],
    [AnimatorSystem],
    [
      GridRenderSystem,
      GraphicsRenderSystem,
      SpriteRenderSystem,
    ]
  ]
};

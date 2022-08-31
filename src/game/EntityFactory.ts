import { Entity, World } from 'ecsy';

import { ControlledComponent } from './systems/ControlledComponent';
import { TargetComponent } from './systems/ai/TargetComponent';
import { SelectableComponent } from './systems/selection/SelectableComponent';
import { PlayerMovementMouseComponent } from './systems/player/PlayerMovementMouseComponent';
import { PlayerMovementKeysComponent } from './systems/player/PlayerMovementKeysComponent';
import { MovePathComponent } from './systems/movement/MovePathComponent';
import { FollowComponent } from './systems/movement/FollowComponent';
import { Position } from './utils';
import { AttackComponent } from './systems/AttackComponent';
import { AnimationService } from './animation/AnimationService';

export interface IUnitProps {
  color: 'red' | 'blue';
  position: Position;
  team: {
    number: number;
  };
}

export class EntityFactory {
  constructor(
    private readonly world: World,
    private readonly animationService: AnimationService
  ) {}

  public createUnit(props: IUnitProps): Entity {
    return this.world
      .createEntity()
      .addComponent(SelectableComponent)
      .addComponent(PlayerMovementKeysComponent)
      .addComponent(PlayerMovementMouseComponent)
      .addComponent(MovePathComponent, { path: [] })
      .addComponent(FollowComponent)
      .addComponent(AttackComponent, {
        aggroRange: 80,
        attackRange: 16,
        attackDamage: 1,
      })
      .addComponent(TargetComponent)
      .addComponent(ControlledComponent);
  }
}

import { Entity, World } from 'ecsy';

import { ControlledComponent } from './systems/ControlledComponent';
import { TargetComponent } from './systems/ai/TargetComponent';
import { MovableComponent } from './systems/movement/MovableComponent';
import { SizeComponent } from './systems/SizeComponent';
import { TransformComponent } from './systems//TransformComponent';
import { Constants } from './Constants';
import { SelectableComponent } from './systems/selection/SelectableComponent';
import { Vector2 } from './math/Vector2';
import { PlayerMovementMouseComponent } from './systems/player/PlayerMovementMouseComponent';
import { MovePositionDirectComponent } from './systems/movement/MovePositionDirectComponent';
import { PlayerMovementKeysComponent } from './systems/player/PlayerMovementKeysComponent';
import { MoveVelocityComponent } from './systems/movement/MoveVelocityComponent';
import { CollidableComponent } from './systems/movement/CollidableComponent';
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
    const width = Constants.CELL_SIZE;
    const height = Constants.CELL_SIZE;
    let rotation = Math.random() * 360;
    rotation -= rotation % 90;

    return this.world
      .createEntity()
      .addComponent(TransformComponent, {
        position: new Vector2(props.position.x, props.position.y),
        rotation: rotation,
      })
      .addComponent(SizeComponent, {
        width: width,
        height: height,
      })
      .addComponent(MovableComponent)
      .addComponent(SelectableComponent)
      .addComponent(MoveVelocityComponent, {
        moveSpeed: 50,
      })
      .addComponent(PlayerMovementKeysComponent)
      .addComponent(MovePositionDirectComponent)
      .addComponent(PlayerMovementMouseComponent)
      .addComponent(MovePathComponent, { path: [] })
      .addComponent(CollidableComponent)
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

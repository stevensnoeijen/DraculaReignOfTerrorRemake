import { Entity, World } from 'ecsy';
import * as PIXI from 'pixi.js';

import { AssetComponent } from './systems/render/AssetComponent';
import { AnimatedSpriteComponent } from './systems/render/sprite/AnimatedSpriteComponent';
import { ControlledComponent } from './systems/ControlledComponent';
import { TargetComponent } from './systems/ai/TargetComponent';
import { MovableComponent } from './systems/movement/MovableComponent';
import { SizeComponent } from './systems/SizeComponent';
import { TransformComponent } from './systems//TransformComponent';
import { Constants } from './Constants';
import { SelectableComponent } from './systems/selection/SelectableComponent';
import { HealthComponent } from './systems/health/HealthComponent';
import { AliveComponent } from './systems/alive/AliveComponent';
import { Vector2 } from './math/Vector2';
import { PlayerMovementMouseComponent } from './systems/player/PlayerMovementMouseComponent';
import { MovePositionDirectComponent } from './systems/movement/MovePositionDirectComponent';
import { PlayerMovementKeysComponent } from './systems/player/PlayerMovementKeysComponent';
import { MoveVelocityComponent } from './systems/movement/MoveVelocityComponent';
import { GraphicsComponent } from './systems/render/graphics/GraphicsComponent';
import { CollidableComponent } from './systems/movement/CollidableComponent';
import { MovePathComponent } from './systems/movement/MovePathComponent';
import { TeamComponent } from './systems/TeamComponent';
import { FollowComponent } from './systems/movement/FollowComponent';
import { Position } from './utils';
import { AttackComponent } from './systems/AttackComponent';
import { AnimationService } from './animation/AnimationService';

interface IUnitProps {
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

    const sprite = new PIXI.AnimatedSprite([PIXI.Texture.EMPTY]);
    const animator = this.animationService.createAnimator(
      sprite,
      props.color,
      'swordsmen'
    );
    sprite.textures = animator.model.getAnimation('idle', 'north').textures;

    sprite.anchor.set(0.5);
    sprite.position.set(props.position.x, props.position.y);
    sprite.animationSpeed = 0.25;
    sprite.play();

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
      .addComponent(HealthComponent, {
        points: 10,
        maxPoints: 10,
      })
      .addComponent(AliveComponent)
      .addComponent(MoveVelocityComponent, {
        moveSpeed: 50,
      })
      .addComponent(PlayerMovementKeysComponent)
      .addComponent(MovePositionDirectComponent)
      .addComponent(PlayerMovementMouseComponent)
      .addComponent(AnimatedSpriteComponent, {
        sprite: sprite,
        state: 'idle_north',
      })
      .addComponent(GraphicsComponent, {
        graphics: new PIXI.Graphics(),
      })
      .addComponent(MovePathComponent, { path: [] })
      .addComponent(CollidableComponent)
      .addComponent(TeamComponent, props.team)
      .addComponent(FollowComponent)
      .addComponent(AttackComponent, {
        aggroRange: 80,
        attackRange: 16,
        attackDamage: 1,
      })
      .addComponent(TargetComponent)
      .addComponent(ControlledComponent)
      .addComponent(AssetComponent, {
        animator: animator,
      });
  }
}

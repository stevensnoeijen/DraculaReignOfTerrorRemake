import { SystemQueries, Entity } from 'ecsy';
import { Sprite } from 'pixi.js';

import { HealthComponent } from '../health/HealthComponent';
import { SelectableComponent } from '../selection/SelectableComponent';
import { PixiJsSystem } from '../PixiJsSystem';
import { AnimatedSpriteComponent } from '../render/sprite/AnimatedSpriteComponent';

import { rotationToDirection } from './../../animation/utils';
import { TransformComponent } from './../TransformComponent';
import { AssetComponent } from './../render/AssetComponent';
import { SpriteComponent } from './../render/sprite/SpriteComponent';
import { AliveComponent } from './AliveComponent';

export class AliveSystem extends PixiJsSystem {
  public static queries: SystemQueries = {
    alives: {
      components: [AliveComponent],
      listen: {
        changed: true,
      },
    },
  };

  public execute(delta: number, time: number): void {
    if (this.queries.alives.changed) {
      this.queries.alives.changed.forEach((entity) => {
        if (this.isDead(entity)) {
          this.handleDead(entity);
        }
      });
    }
  }

  private isDead(entity: Entity): boolean {
    const alive = entity.getMutableComponent(AliveComponent);
    if (!alive) {
      return false;
    }

    return !alive.alive;
  }

  private handleDead(entity: Entity): void {
    entity.removeComponent(SelectableComponent);
    entity.removeComponent(HealthComponent);

    const assetComponent = entity.getComponent(AssetComponent)!;
    const transformComponent = entity.getComponent(TransformComponent)!;
    assetComponent.animator.set(
      'dead',
      rotationToDirection(transformComponent.rotation)
    );
  }

  private static getSprite(entity: Entity): Sprite {
    if (entity.hasComponent(SpriteComponent)) {
      return entity.getComponent(SpriteComponent)!.sprite;
    }
    if (entity.hasComponent(AnimatedSpriteComponent)) {
      return entity.getComponent(AnimatedSpriteComponent)!.sprite;
    }

    throw new Error('Entity has no sprite');
  }
}

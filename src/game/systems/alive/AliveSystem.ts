import { SystemQueries, Entity } from 'ecsy';

import { HealthComponent } from '../health/HealthComponent';
import { SelectableComponent } from '../selection/SelectableComponent';
import { PixiJsSystem } from '../PixiJsSystem';
import { rotationToDirection } from '../../animation/load';

import { SimEcsComponent } from './../SimEcsComponent';
import { isAlive } from './../utils/index';
import { TransformComponent } from './../TransformComponent';
import { AssetComponent } from './../render/AssetComponent';

export class AliveSystem extends PixiJsSystem {
  public static queries: SystemQueries = {
    alives: {
      components: [SimEcsComponent],
      listen: {
        changed: true,
      },
    },
  };

  public execute(delta: number, time: number): void {
    if (this.queries.alives.changed) {
      this.queries.alives.changed.forEach((entity) => {
        if (!isAlive(entity)) {
          this.handleDead(entity);
        }
      });
    }
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
}

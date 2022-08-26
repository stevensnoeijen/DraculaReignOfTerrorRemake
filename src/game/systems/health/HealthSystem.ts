import { Entity, System, SystemQueries } from 'ecsy';

import { SimEcsComponent } from './../SimEcsComponent';
import { HealthComponent } from './HealthComponent';

import { Alive } from '~/game/components/Alive';

export class HealthSystem extends System {
  // Define a query of entities that have "Velocity" and "Position" components
  public static queries: SystemQueries = {
    healthy: {
      components: [HealthComponent],
      listen: {
        added: true,
        changed: true,
      },
    },
  };

  public execute(delta: number, time: number): void {
    if (this.queries.healthy.added !== undefined) {
      this.queries.healthy.added.forEach(this.updateStatus);
    }
    if (this.queries.healthy.changed !== undefined) {
      this.queries.healthy.changed.forEach(this.updateStatus);
    }
  }

  private updateStatus(entity: Entity): void {
    const health = entity.getComponent(HealthComponent);
    if (!health) {
      return;
    }

    if (health.points === 0) {
      const aliveComponent = entity.getComponent(SimEcsComponent)!.entity.getComponent(Alive);
      if (!aliveComponent) {
        return;
      }
      aliveComponent.alive = false;
    }
  }
}

import { Entity, System, SystemQueries } from 'ecsy';

import { SimEcsComponent } from './../SimEcsComponent';

import { Alive } from '~/game/components/Alive';
import { Health } from '~/game/components/Health';

export class HealthSystem extends System {
  // Define a query of entities that have "Velocity" and "Position" components
  public static queries: SystemQueries = {
    healthy: {
      components: [SimEcsComponent],
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
    const simEcsComponent = entity.getComponent(SimEcsComponent);
    if (!simEcsComponent) {
      return;
    }

    const health = simEcsComponent.entity.getComponent(Health)!;
    if (health.points === 0) {
      const alive = simEcsComponent.entity.getComponent(Alive);
      if (!alive) {
        return;
      }
      alive.alive = false;
    }
  }
}

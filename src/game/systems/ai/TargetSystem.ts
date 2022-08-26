import { System, SystemQueries } from 'ecsy';

import { isAlive } from './../utils/index';
import { TargetComponent } from './TargetComponent';

export class TargetSystem extends System {
  static queries: SystemQueries = {
    entities: {
      components: [TargetComponent],
    },
  };

  public execute(delta: number, time: number): void {
    this.checkDead();
  }

  private checkDead(): void {
    for (const entity of this.queries.entities.results) {
      const targetComponent = entity.getComponent(TargetComponent)!;
      if (targetComponent.target === null) {
        return;
      }

      if (!isAlive(targetComponent.target)) {
        entity.getMutableComponent(TargetComponent)!.target = null;
      }
    }
  }
}

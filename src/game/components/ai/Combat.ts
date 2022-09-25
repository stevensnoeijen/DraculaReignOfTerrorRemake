
import { IEntity } from 'sim-ecs';

import { Health } from '../Health';


export class Combat {
  constructor(
    public readonly aggroRange: number,
    public readonly attackRange: number,
    public readonly attackDamage: number,
    public readonly attackCooldown: number,
  ) { }

  attack(enemy: IEntity): void {
    const enemyHealthComponent = enemy.getComponent(Health)!;
    enemyHealthComponent.takeHit(this.attackDamage);
  }
}

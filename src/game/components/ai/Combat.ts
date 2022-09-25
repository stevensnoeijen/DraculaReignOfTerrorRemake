import { IEntity } from 'sim-ecs';

import { Health } from '../Health';

import { Timer } from '~/game/utils/Timer';

export class Combat {
  public attacking: IEntity | null = null;
  public cooldown: Timer;

  constructor(
    public readonly aggroRange: number,
    public readonly attackRange: number,
    public readonly attackDamage: number,
    public readonly attackCooldown: number
  ) {
    this.cooldown = new Timer({
      delay: attackCooldown,
    });
  }

  attack(): void {
    const enemyHealthComponent = this.attacking!.getComponent(Health)!;
    enemyHealthComponent.takeHit(this.attackDamage);
  }
}

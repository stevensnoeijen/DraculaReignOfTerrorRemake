import { IEntity } from 'sim-ecs';

import { Health } from '../Health';

import { Cooldown } from './../../utils/Cooldown';

export class Combat {
  public target: IEntity | null = null;
  private readonly cooldown: Cooldown;

  constructor(
    public readonly aggroRange: number,
    public readonly attackRange: number,
    public readonly attackDamage: number,
    public readonly attackCooldown: number
  ) {
    this.cooldown = new Cooldown(attackCooldown, () => this.attack());
  }

  public update() {
    this.cooldown.update();
  }

  public reset() {
    this.cooldown.reset();
  }

  private attack(): void {
    const enemyHealthComponent = this.target!.getComponent(Health)!;
    enemyHealthComponent.takeHit(this.attackDamage);
  }
}

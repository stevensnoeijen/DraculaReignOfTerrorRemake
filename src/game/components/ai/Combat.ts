import { IEntity } from 'sim-ecs';

import { Health } from '../Health';

import { Cooldown } from './../../utils/Cooldown';

import { Range } from '~/game/utils/Range';

export class Combat {
  public target: IEntity | null = null;
  private readonly cooldown: Cooldown;

  constructor(
    public readonly aggroRange: Range,
    public readonly attackRange: Range,
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

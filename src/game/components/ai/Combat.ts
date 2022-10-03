import { IEntity } from 'sim-ecs';
import { random } from 'lodash';

import { Health } from '../Health';

import { Cooldown } from './../../utils/Cooldown';

import { Range } from '~/game/utils/Range';

export class Combat {
  public target: IEntity | null = null;

  private readonly attackCooldown: Cooldown;

  constructor(
    public readonly aggroRange: Range,
    public readonly attackRange: Range,
    public readonly attackDamage: Range,
    public readonly attackCooldownTime: number
  ) {
    this.attackCooldown = new Cooldown(attackCooldownTime, () => this.attack());
  }

  public update() {
    this.attackCooldown.update();
  }

  public reset() {
    this.attackCooldown.reset();
  }

  private attack(): void {
    const enemyHealthComponent = this.target!.getComponent(Health)!;
    enemyHealthComponent.takeHit(
      random(this.attackDamage.min, this.attackDamage.max, false)
    );
  }
}

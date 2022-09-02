import { Entity } from 'ecsy';

import { Health } from '../Health';

import { getSimComponent } from '~/game/systems/utils';

export class Combat {
  constructor(
    public readonly aggroRange: number,
    public readonly attackRange: number,
    public readonly attackDamage: number,
  ) { }

  attack(enemy: Entity): void {
    const enemyHealthComponent = getSimComponent(enemy, Health)!;
    enemyHealthComponent.takeHit(this.attackDamage);
  }
}

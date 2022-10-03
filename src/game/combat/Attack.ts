import { random } from 'lodash';

import { Health } from '../components';
import { Percentage } from '../types';
import { Range } from '../utils/Range';

import { Cooldown } from './../utils/Cooldown';
import { CombatController } from './CombatController';
import { HasRange } from './HasRange';

type AttackProps = Pick<Attack, 'range' | 'damage' | 'hitChance'> & {
  cooldownTime: number;
};

export class Attack implements HasRange {
  public readonly range: Range;
  public readonly damage: Range;
  public readonly hitChance: Percentage;
  public combatController: CombatController | null = null;

  private readonly cooldown: Cooldown;

  constructor(props: AttackProps) {
    this.range = props.range;
    this.damage = props.damage;
    this.hitChance = props.hitChance;
    this.cooldown = new Cooldown(props.cooldownTime, () => this.execute());
  }

  public update() {
    this.cooldown.update();
  }

  public reset() {
    this.cooldown.reset();
  }

  private execute(): void {
    if (!this.doHit()) return;

    const enemyHealth = this.combatController!.target!.getComponent(Health)!;
    enemyHealth.takeHit(random(this.damage.min, this.damage.max, false));
  }

  private doHit() {
    return Math.random() <= this.hitChance;
  }
}

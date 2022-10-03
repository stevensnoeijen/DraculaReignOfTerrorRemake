import { random } from 'lodash';

import { Health } from '../components';
import { Range } from '../utils/Range';

import { Cooldown } from './../utils/Cooldown';
import { CombatController } from './CombatController';
import { HasRange } from './HasRange';

type AttackProps = Pick<Attack, 'range' | 'damage'> & {
  cooldownTime: number;
};

export class Attack implements HasRange {
  public readonly range: Range;
  public readonly damage: Range;
  public combat: CombatController | null = null;

  private readonly cooldown: Cooldown;

  constructor(props: AttackProps) {
    this.range = props.range;
    this.damage = props.damage;
    this.cooldown = new Cooldown(props.cooldownTime, () => this.execute());
  }

  public update() {
    this.cooldown.update();
  }

  public reset() {
    this.cooldown.reset();
  }

  private execute(): void {
    const enemyHealth = this.combat!.target!.getComponent(Health)!;
    enemyHealth.takeHit(random(this.damage.min, this.damage.max, false));
  }
}

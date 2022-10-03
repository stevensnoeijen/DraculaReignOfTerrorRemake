import { Combat } from '../components';
import { Unit } from '../data/Unit';

import { Aggro } from './Aggro';
import { Attack } from './Attack';
import { CombatController } from './CombatController';

export class CombatService {
  createComponent(data: Unit): Combat {
    return new Combat(this.createController(data));
  }

  private createController(data: Unit): CombatController {
    return new CombatController({
      aggro: new Aggro(data.combatAggroRange),
      attack: new Attack({
        range: data.combatAttackRange,
        damage: data.combatAttackDamage,
        hitChance: data.combatAttackHitChance,
        cooldownTime: data.combatAttackCooldown,
      }),
    });
  }
}

import { Component, Entity, Types } from 'ecsy';

import { Health } from '../components/Health';

import { SimEcsComponent } from './SimEcsComponent';

interface AttackComponentProps {
  aggroRange: number;
  attackRange: number;
  attackDamage: number;
}

export class AttackComponent extends Component<AttackComponentProps> {
  static schema = {
    aggroRange: { type: Types.Number },
    attackRange: { type: Types.Number },
    attackDamage: { type: Types.Number },
  };

  aggroRange!: number;
  attackRange!: number;
  attackDamage!: number;

  attack(enemy: Entity): void {
    const enemyHealthComponent = enemy.getMutableComponent(SimEcsComponent)!.entity.getComponent(Health)!;
    enemyHealthComponent.takeHit(this.attackDamage);
  }
}

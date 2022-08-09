import { Component, Entity, Types } from 'ecsy';

import { EditableProperty } from '../component.decorator';

import { HealthComponent } from './health/HealthComponent';

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

  @EditableProperty({
    type: Number,
    nullable: false,
  })
  aggroRange!: number;

  @EditableProperty({
    type: Number,
    nullable: false,
  })
  attackRange!: number;

  @EditableProperty({
    type: Number,
    nullable: false,
  })
  attackDamage!: number;

  attack(enemy: Entity): void {
    const enemyHealthComponent = enemy.getMutableComponent(HealthComponent)!;
    enemyHealthComponent.takeHit(this.attackDamage);
  }
}

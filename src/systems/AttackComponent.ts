import { HealthComponent } from './health/HealthComponent';
import { Component, Entity, Types } from 'ecsy';

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
		const enemyHealthComponent = enemy.getMutableComponent(HealthComponent)!;
		enemyHealthComponent.takeHit(this.attackDamage);
	}
}

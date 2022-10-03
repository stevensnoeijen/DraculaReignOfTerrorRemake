import { IEntity } from 'sim-ecs';

import { Attack } from '~/game/combat/Attack';
import { Aggro } from '~/game/combat/Aggro';

type CombatProps = Pick<Combat, 'aggro' | 'attack'>;
export class Combat {
  public readonly aggro: Aggro;
  public readonly attack: Attack;
  private _target: IEntity | null = null;

  constructor(props: CombatProps) {
    this.aggro = props.aggro;
    this.attack = props.attack;
    this.attack.combat = this;
  }

  public set target(value: IEntity | null) {
    this._target = value;
  }

  public get target(): IEntity | null {
    return this._target;
  }

  public update() {
    this.attack.update();
  }

  public reset() {
    this.attack.reset();
  }
}

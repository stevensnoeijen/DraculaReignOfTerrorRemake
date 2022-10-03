import { IEntity } from 'sim-ecs';

import { Aggro } from './Aggro';
import { Attack } from './Attack';

type CombatControllerProps = Pick<CombatController, 'aggro' | 'attack'>;

export class CombatController {
  public readonly aggro: Aggro;
  public readonly attack: Attack;
  private _target: IEntity | null = null;

  constructor(props: CombatControllerProps) {
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

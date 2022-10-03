import { IEntity } from 'sim-ecs';

import { CombatController } from '../../combat/CombatController';

import { Aggro } from '~/game/combat/Aggro';
import { Attack } from '~/game/combat/Attack';

export class Combat {
  constructor(private readonly controller: CombatController) {}

  get aggro(): Aggro {
    return this.controller.aggro;
  }
  get attack(): Attack {
    return this.controller.attack;
  }

  public set target(value: IEntity | null) {
    this.controller.target = value;
  }

  public get target(): IEntity | null {
    return this.controller.target;
  }

  public update() {
    this.attack.update();
  }

  public reset() {
    this.attack.reset();
  }
}

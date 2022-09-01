import { Entity, World } from 'ecsy';

import { ControlledComponent } from './systems/ControlledComponent';
import { TargetComponent } from './systems/ai/TargetComponent';
import { Position } from './utils';
import { AttackComponent } from './systems/AttackComponent';
import { AnimationService } from './animation/AnimationService';

export interface IUnitProps {
  color: 'red' | 'blue';
  position: Position;
  team: {
    number: number;
  };
}

export class EntityFactory {
  constructor(
    private readonly world: World,
    private readonly animationService: AnimationService
  ) {}

  public createUnit(props: IUnitProps): Entity {
    return this.world
      .createEntity()
      .addComponent(AttackComponent, {
        aggroRange: 80,
        attackRange: 16,
        attackDamage: 1,
      })
      .addComponent(TargetComponent)
      .addComponent(ControlledComponent);
  }
}

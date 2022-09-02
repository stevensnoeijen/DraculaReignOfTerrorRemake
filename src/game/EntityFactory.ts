import { Entity, World } from 'ecsy';

import { Position } from './utils';
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
      .createEntity();
  }
}

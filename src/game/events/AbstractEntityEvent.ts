import { IEntity } from 'sim-ecs';

export abstract class AbstractEntityEvent {
  constructor(
    public readonly entity: IEntity
  ) {}
}

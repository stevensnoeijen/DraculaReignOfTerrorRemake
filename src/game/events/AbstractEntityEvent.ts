import { IEntity } from 'sim-ecs';

export type AbstractEntityEventConstructor
  <T extends AbstractEntityEvent = AbstractEntityEvent>
    = new (entity: IEntity) => T;

export abstract class AbstractEntityEvent {
  constructor(
    public readonly entity: IEntity
  ) {}
}

import { IEntity } from 'sim-ecs';

export type EntityEventConstructor
  <T extends EntityEvent = EntityEvent>
    = new (entity: IEntity) => T;

export class EntityEvent {
  constructor(
    public readonly entity: IEntity
  ) {}
}

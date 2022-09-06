import { IEntity } from 'sim-ecs';

export type EntityEventConstructor
  <T extends EntityEvent = EntityEvent>
    = new (entity: IEntity) => T;

  /**
   * Should be used as abstract class,
   * extend this class for every entity-related event.
   */
export class EntityEvent {
  constructor(
    public readonly entity: IEntity
  ) {}
}

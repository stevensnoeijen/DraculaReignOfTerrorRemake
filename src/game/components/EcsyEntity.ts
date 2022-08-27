import { Entity } from 'ecsy';

export class EcsyEntity {
  public entity: Entity;

  constructor(entity: Entity) {
    this.entity = entity;
  }
}

import { Entity } from 'ecsy';

export class EcsyEntity {
  constructor(public readonly entity: Entity) {
    this.entity = entity;
  }
}

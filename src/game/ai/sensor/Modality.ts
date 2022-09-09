import { IEntity } from 'sim-ecs';

export class Modality {
  constructor(
    public readonly entity: IEntity,
    public readonly range: number,
  ) {}
}

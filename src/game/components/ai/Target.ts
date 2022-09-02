import { IEntity } from 'sim-ecs';

export class Target {
  constructor(
    public entity: IEntity | null = null
  ) {};
}

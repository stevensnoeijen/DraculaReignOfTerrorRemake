import { IEntity } from 'sim-ecs';

export class Follow {
  constructor(
    public entity: IEntity | null = null
  ) {
  }
}

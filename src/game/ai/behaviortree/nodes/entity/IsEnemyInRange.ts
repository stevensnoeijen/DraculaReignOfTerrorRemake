import { Class } from 'utility-types';
import { IEntity } from 'sim-ecs';

import { State } from '../Node';

import { EntityNode } from './EntityNode';
import { getEntitiesInRange } from './utils';



export class IsEnemyInRange<
  TComponent extends Object,
  TProperty extends keyof TComponent = keyof TComponent
> extends EntityNode {
  constructor(
    private readonly entities: IEntity[],
    private readonly componentConstructor: Class<TComponent>,
    private readonly componentProperty: TProperty
  ) {
    super();
  }

  protected evaluateByEntity(entity: IEntity): State {
    const range = entity.getComponent(this.componentConstructor)![
      this.componentProperty
    ] as unknown as number;

    const inRangeEntities = getEntitiesInRange(
      entity,
      this.entities,
      range);
    if (inRangeEntities.length == 0) {
      return this.failure();
    }
    console.log(true);

    this.parent!.setData('target', inRangeEntities[0]);

    return this.success();
  }
}

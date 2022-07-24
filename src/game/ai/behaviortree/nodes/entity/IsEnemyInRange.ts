import { Component, ComponentConstructor, Entity } from 'ecsy';

import { State } from '../Node';
import { EntityNode } from './EntityNode';
import { getEntitiesInRange } from './utils';

export class IsEnemyInRange<
  TComponent extends Component<any>,
  TProperty extends keyof TComponent = keyof TComponent
> extends EntityNode {
  constructor(
    private readonly entities: Entity[],
    private readonly componentConstructor: ComponentConstructor<TComponent>,
    private readonly componentProperty: TProperty
  ) {
    super();
  }

  protected evaluateByEntity(entity: Entity): State {
    const range = entity.getComponent(this.componentConstructor)![
      this.componentProperty
    ] as unknown as number;

    const inRangeEntities = getEntitiesInRange(entity, this.entities, range);
    if (inRangeEntities.length == 0) {
      return this.failure();
    }

    this.parent!.setData('target', inRangeEntities[0]);

    return this.success();
  }
}

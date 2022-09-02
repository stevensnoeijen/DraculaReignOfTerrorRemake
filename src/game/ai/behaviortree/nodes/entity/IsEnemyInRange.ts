import { Class } from 'utility-types';
import { IEntity } from 'sim-ecs';

import { State } from '../Node';

import { SimEcsComponent } from './../../../../systems/SimEcsComponent';
import { EcsyEntity } from './../../../../components/EcsyEntity';
import { ecsyEntities } from './../../../../utils';
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
      entity.getComponent(EcsyEntity)!.entity,
      ecsyEntities(this.entities),
      range);
    if (inRangeEntities.length == 0) {
      return this.failure();
    }

    this.parent!.setData('target', inRangeEntities[0].getComponent(SimEcsComponent)!.entity);

    return this.success();
  }
}

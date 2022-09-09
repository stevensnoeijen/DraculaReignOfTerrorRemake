import { Class } from 'utility-types';
import { IEntity } from 'sim-ecs';

import { State } from '../Node';

import { EntityNode } from './EntityNode';

import { Sensory } from '~/game/components';

export class IsEnemyInRange<
  TComponent extends Object,
  TProperty extends keyof TComponent = keyof TComponent
> extends EntityNode {
  constructor(
    private readonly componentConstructor: Class<TComponent>,
    private readonly componentProperty: TProperty
  ) {
    super();
  }

  protected evaluateByEntity(entity: IEntity): State {
    const range = entity.getComponent(this.componentConstructor)![
      this.componentProperty
    ] as unknown as number;

    const entitiesInRange = this.getEnemiesInRange(range);
    if (entitiesInRange.length === 0)
      return this.failure();

    this.parent!.setData('target', entitiesInRange[0]);

    return this.success();
  }

  private getEnemiesInRange (range: number) {
    const entity = this.getData('entity') as IEntity | null;
    if (entity == null)
      return [];

    return entity.getComponent(Sensory)?.sensor.modalities
      .filter(modality => modality.range <= range)
      .map(modality => modality.entity) ?? [];
  }
}

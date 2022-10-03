import { Class, PickByValueExact } from 'utility-types';
import { IEntity } from 'sim-ecs';

import { State } from '../Node';

import { EntityNode } from './EntityNode';

import { Sensory, Team } from '~/game/components';
import { isOnTeam } from '~/game/utils/components';
import { Range } from '~/game/utils/Range';

export class IsEnemyInRange<
  TComponent extends Object,
  TProperty extends keyof PickByValueExact<
    TComponent,
    Range
  > = keyof PickByValueExact<TComponent, Range>
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
    ];
    if (!(range instanceof Range))
      throw new Error(
        'Range object should be be of type Range but is ' + typeof range
      );

    const entitiesInRange = this.getEnemiesInRange(range);
    if (entitiesInRange.length === 0) return this.failure();

    this.root.setData('enemy', entitiesInRange[0]);

    return this.success();
  }

  private getEnemiesInRange(range: Range) {
    const entity = this.getData('entity') as IEntity | null;
    if (entity == null) return [];

    return (
      entity
        .getComponent(Sensory)
        ?.sensor.modalities.filter((modality) => range.includes(modality.range))
        .filter(
          (modality) => !isOnTeam(entity.getComponent(Team)!)(modality.entity)
        )
        .map((modality) => modality.entity) ?? []
    );
  }
}

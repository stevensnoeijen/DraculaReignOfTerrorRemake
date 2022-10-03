import { Class, PickByValue } from 'utility-types';
import { IEntity } from 'sim-ecs';

import { State } from '../Node';

import { EntityNode } from './EntityNode';

import { isHasRange, HasRange } from '~/game/combat/HasRange';
import { Sensory, Team } from '~/game/components';
import { isOnTeam } from '~/game/utils/components';
import { Range } from '~/game/utils/Range';

export class IsEnemyInRange<
  TComponent extends Object,
  TProperty extends keyof PickByValue<TComponent, HasRange> = keyof PickByValue<
    TComponent,
    HasRange
  >
> extends EntityNode {
  constructor(
    private readonly componentConstructor: Class<TComponent>,
    private readonly componentProperty: TProperty
  ) {
    super();
  }

  protected evaluateByEntity(entity: IEntity): State {
    const component = entity.getComponent(this.componentConstructor)![
      this.componentProperty
    ];
    if (!isHasRange(component))
      throw new Error(
        `Property
        ${this.componentProperty as string}
        of class
        ${this.componentConstructor.name}
        should have range object but does not.`
      );

    const entitiesInRange = this.getEnemiesInRange(component.range);
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

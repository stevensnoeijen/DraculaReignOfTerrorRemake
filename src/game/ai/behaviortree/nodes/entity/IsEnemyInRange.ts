import { Class } from 'utility-types';
import { IEntity } from 'sim-ecs';

import { State } from '../Node';

import { EntityNode } from './EntityNode';

import { Sensory, Team } from '~/game/components';
import { isOnTeam } from '~/game/utils/components';

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
    if (entitiesInRange.length === 0) {
      this.root.setData('enemy', null);
      return this.failure();
    }

    this.root.setData('enemy', entitiesInRange[0]);

    return this.success();
  }

  private getEnemiesInRange(range: number) {
    const entity = this.getData('entity') as IEntity | null;
    if (entity == null) return [];

    return (
      entity
        .getComponent(Sensory)
        ?.sensor.modalities.filter((modality) => modality.range <= range)
        .filter(
          (modality) => !isOnTeam(entity.getComponent(Team)!)(modality.entity)
        )
        .map((modality) => modality.entity) ?? []
    );
  }
}

import { IEntity } from 'sim-ecs';

import { Modality } from './Modality';

import { not } from '~/utils/predicate';
import { isSameEntity } from '~/game/utils/entity';

export class Sensor {
  constructor(
    public readonly range: number,
    private _modalities: Modality[] = [],
  ) {}

  /**
   * There should be only one Modality per entity
   */
  public get modalities (): readonly Modality[] {
    return this._modalities;
  }

  public addModality (modality: Modality) {
    // replace modality of entity
    this.removeModalityByEntity(modality.entity);

    this._modalities.push(modality);
  }

  public removeModalityByEntity (entity: IEntity) {
    this._modalities = this._modalities
      .filter(modality => not(isSameEntity(entity))(modality.entity));
  }
}

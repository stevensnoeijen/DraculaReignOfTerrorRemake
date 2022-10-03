import { jsonMember, jsonObject } from 'typedjson';

import { Unit } from './Unit';

import { ClassProps } from '~/types';

@jsonObject
export class EntityDefinition {
  @jsonMember(String)
  name!: string;

  @jsonMember(Unit)
  properties!: Unit;

  constructor(props?: ClassProps<EntityDefinition>) {
    Object.assign(this, props);
  }
}

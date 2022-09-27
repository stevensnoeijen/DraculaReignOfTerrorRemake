import { jsonMember, jsonObject } from 'typedjson';

import { Unit } from './Unit';

@jsonObject
export class EntityDefinition {
  @jsonMember(String)
  name!: string;

  @jsonMember(Unit)
  properties!: Unit;
}

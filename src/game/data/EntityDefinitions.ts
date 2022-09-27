import { jsonArrayMember, jsonObject } from 'typedjson';

import { EntityDefinition } from './EntityDefinition';

@jsonObject
export class EntityDefinitions {
  @jsonArrayMember(EntityDefinition)
  definitions!: EntityDefinition[];
}

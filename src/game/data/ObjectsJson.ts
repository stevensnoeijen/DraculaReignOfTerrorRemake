import { Mutable } from 'utility-types';

import { Range } from '../utils/Range';

import { EntityDefinition } from './EntityDefinition';

export type PropertyValue =
  | string
  | boolean
  | number
  | string[]
  | Mutable<Range>;

export const isObject = (entity: object): entity is EntityDefinition => {
  return 'name' in entity;
};

export type ObjectsJson = EntityDefinition[];

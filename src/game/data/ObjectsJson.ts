import { Mutable } from 'utility-types';

import { Range } from '../utils/Range';

export type PropertyValue =
  | string
  | boolean
  | number
  | string[]
  | Mutable<Range>;

export type GameObject = {
  name: string;
  properties: {
    [key: string]: PropertyValue | undefined;
  };
};

export const isObject = (entity: object): entity is GameObject => {
  return 'name' in entity;
};

export type ObjectsJson = GameObject[];

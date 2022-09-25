import { Range } from '../utils/Range';

export type PropertyValue = string | boolean | number | string[] | Range;

export type Property = {
  field: string;
  value: PropertyValue;
};

export type Component = {
  type: string;
  properties: Property[];
};

export type GameObject = {
  name: string;
  properties: Property[];
};

export const isObject = (entity: object): entity is GameObject => {
  return 'name' in entity;
};

export type ObjectsJson = GameObject[];

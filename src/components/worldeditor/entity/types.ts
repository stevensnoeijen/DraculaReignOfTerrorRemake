import { FormInst } from 'naive-ui';

export type PropertyValue = string | boolean | number;

export type Property = {
  field: string;
  value: PropertyValue;
};

export type Component = {
  type: string;
  properties: Property[];
};

export type Entity = {
  name: string;
  properties: Property[];
};

export const isEntity = (entity: object): entity is Entity => {
  return 'name' in entity;
};

export type EntityCreateInstance = {
  form: FormInst;
  entity: Entity;
};

export type PropertyValue = String | Boolean | Number;

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

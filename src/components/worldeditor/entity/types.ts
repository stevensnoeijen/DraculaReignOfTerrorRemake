export type PropertyValue = string | boolean | number;

export type Property = {
  field: string;
  value: PropertyValue;
};

export type Entity = {
  name: string;
  components: {
    type: string;
    properties: Property[];
  }[];
};

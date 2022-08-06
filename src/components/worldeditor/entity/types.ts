export type Property = {
  field: string;
  value: string | boolean | number;
};

export type Entity = {
  name: string;
  components: {
    type: string;
    properties: Property[];
  }[];
};

import { Component, ComponentConstructor } from 'ecsy';
import importToArray from 'import-to-array';

import * as Components from '~/game/systems/components';

type ClassDescriptor = { [x: string]: PropertyDescriptor };

const COMPONENTS_CLASSES: readonly ComponentConstructor<Component<unknown>>[] =
  [...importToArray(Components)] as const;

type PropertiesByComponent = {
  [key: string]: ClassDescriptor;
};

const filterEditableProperties = (object: ClassDescriptor): ClassDescriptor => {
  return Object.keys(object)
    .filter((key) => !key.startsWith('_'))
    .reduce((cur, key) => {
      return Object.assign(cur, { [key]: object[key] });
    }, {});
};

export const getPropertiesByComponents = (): PropertyDescriptor => {
  const components: PropertiesByComponent = {};

  for (const componentClass of COMPONENTS_CLASSES) {
    const component = new componentClass();
    const propertyDescriptors = filterEditableProperties(
      Object.getOwnPropertyDescriptors(component)
    );
    components[componentClass.name] = propertyDescriptors;
  }

  return components;
};

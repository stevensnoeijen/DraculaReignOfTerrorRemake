import { Class } from 'utility-types';

import { GameObject, PropertyValue } from './../ObjectsJson';

import {
  EditablePropertyOptions,
  getEditableProperties,
} from '~/game/objects/decorator';
import { Unit } from '~/game/objects/Unit';

type PropertyType = Class<PropertyValue>;

const getDefaultValueByType = <T extends PropertyType>(type: T): T => {
  // @ts-ignore
  if (type === String) {
    return '' as unknown as T;
  }
  // @ts-ignore
  if (type === Number) {
    return 0 as unknown as T;
  }
  // @ts-ignore
  if (type === Boolean) {
    return false as unknown as T;
  }

  return undefined!;
};

const getDefaultValue = <T extends PropertyType>(
  options: EditablePropertyOptions<T>
): T => {
  if (options.defaultValue != null) return options.defaultValue;

  return Array.isArray(options.type)
    ? ([] as unknown as T)
    : getDefaultValueByType(options.type);
};

export const createEmptyObject = (): GameObject => {
  const editableProperties = getEditableProperties(Unit)!;

  return {
    name: '',
    properties: Object.keys(editableProperties).map((key) => {
      const options = editableProperties[key];

      return {
        field: key,
        value: getDefaultValue(options),
      };
    }),
  };
};

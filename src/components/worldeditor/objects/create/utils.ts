import { Class } from 'utility-types';

import { GameObject, PropertyValue } from './../ObjectsJson';

import {
  EditablePropertyOptions,
  getEditableProperties,
} from '~/game/objects/decorator';
import { Unit } from '~/game/objects/Unit';

export const getDefaultValueByType = <T extends unknown>(type: T): T => {
  if (type === String) {
    return '' as T;
  }
  if (type === Number) {
    return 0 as T;
  }
  if (type === Boolean) {
    return false as T;
  }

  throw new Error(`Can not create default value of unknown type ${type}`);
};

const getDefaultValue = <T extends Class<PropertyValue>>(
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

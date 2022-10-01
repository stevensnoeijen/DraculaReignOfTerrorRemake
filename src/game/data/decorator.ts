import { Class } from 'utility-types';

import { PropertyValue } from './types';

import { Reflector } from '~/utils/reflector';

export interface EditablePropertyOptions<Type extends Class<PropertyValue>> {
  type: Type;

  /**
   * By default takes the default set value.
   * Set this value to override the default value.
   */
  defaultValue?: Type;
  /**
   * @default false
   */
  nullable?: boolean;
}

const reflector = new Reflector<EditablePropertyOptions<any>>();

export function EditableProperty(
  options: EditablePropertyOptions<any>
): PropertyDecorator {
  return <D>(
    target: Object,
    propertyName: string | symbol,
    descriptor?: TypedPropertyDescriptor<D>
  ): TypedPropertyDescriptor<D> | void => {
    reflector.set(
      target.constructor as Class<any>,
      propertyName.toString(),
      options
    );

    return descriptor;
  };
}

export const getEditableClasses = () => {
  return Object.keys(reflector.getAll());
};

export const getEditableProperties = <ComponentType extends Class<unknown>>(
  classType: ComponentType
) => {
  return reflector.getAllByClass(classType);
};

export const getEditableProperty = (
  classType: Class<unknown> | string,
  property: string
) => {
  return reflector.get(classType, property);
};

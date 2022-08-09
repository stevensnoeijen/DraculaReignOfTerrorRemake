import { Class } from 'utility-types';
import { Component } from 'ecsy';

import { Reflector } from './systems/utils/reflector';

import { PropertyValue } from '~/components/worldeditor/entity/types';

export interface EditablePropertyOptions<
  Type extends PropertyValue | unknown = unknown
> {
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

const reflector = new Reflector<EditablePropertyOptions<unknown>>();

export function EditableProperty(
  options: EditablePropertyOptions<unknown>
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

export const getEditableProperties = <
  ComponentType extends Class<Component<unknown>>
>(
  classType: ComponentType
) => {
  return reflector.getAllByClass(classType);
};

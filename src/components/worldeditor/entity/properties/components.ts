import { Component } from 'ecsy';
import importToArray from 'import-to-array';
import { Class } from 'utility-types';

import {
  EditablePropertyOptions,
  getEditableProperties,
} from '~/game/component.decorator';
import * as Components from '~/game/systems/components';

const COMPONENTS_CLASSES: readonly Class<Component<unknown>>[] = [
  ...importToArray(Components),
] as const;

export const getEditableComponents = (): Record<
  string,
  Record<string, EditablePropertyOptions>
> => {
  return COMPONENTS_CLASSES.reduce((curr, componentClass) => {
    const component = getEditableProperties(componentClass);

    return {
      ...curr,
      // only add of component is set
      ...(component != null ? { [componentClass.name]: component } : undefined),
    };
  }, {});
};

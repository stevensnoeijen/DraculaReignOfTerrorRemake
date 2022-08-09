import { Component } from 'ecsy';
import importToArray from 'import-to-array';
import { Class } from 'utility-types';

import { getEditableProperties } from '~/game/component.decorator';
import * as Components from '~/game/systems/components';
import { omitUndefined } from '~/utils/object';

const COMPONENTS_CLASSES: readonly Class<Component<unknown>>[] = [
  ...importToArray(Components),
] as const;

export const getEditableComponents = () => {
  const componentDescribers = COMPONENTS_CLASSES.reduce(
    (curr, componentClass) => {
      return {
        ...curr,
        [componentClass.name]: getEditableProperties(componentClass),
      };
    },
    {}
  );

  return omitUndefined(componentDescribers);
};

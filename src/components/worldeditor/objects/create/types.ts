import { FormInst } from 'naive-ui';

import { EntityDefinition } from '~/game/data/EntityDefinition';

export type ObjectCreateInstance = {
  form: FormInst;
  object: EntityDefinition;
};

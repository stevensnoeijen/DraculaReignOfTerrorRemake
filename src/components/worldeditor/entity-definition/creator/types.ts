import { FormInst } from 'naive-ui';

import { EntityDefinition } from '~/game/data/EntityDefinition';

export type EntityDefinitionCreatorInstance = {
  form: FormInst;
  entityDefinition: EntityDefinition;
};

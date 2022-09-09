import { FormInst } from 'naive-ui';

import { GameObject } from '~/game/data/ObjectsJson';

export type ObjectCreateInstance = {
  form: FormInst;
  object: GameObject;
};

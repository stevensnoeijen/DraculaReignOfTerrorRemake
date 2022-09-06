import { FormInst } from 'naive-ui';

import { GameObject } from '~/game/objects/ObjectsJson';

export type ObjectCreateInstance = {
  form: FormInst;
  object: GameObject;
};

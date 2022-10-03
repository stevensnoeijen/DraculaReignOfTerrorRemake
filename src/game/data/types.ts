import { Mutable } from 'utility-types';

import { Range } from '../utils/Range';

export type PropertyValue =
  | string
  | boolean
  | number
  | string[]
  | Mutable<Range>;

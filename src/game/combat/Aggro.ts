import { Range } from '../utils/Range';

import { HasRange } from './HasRange';

export class Aggro implements HasRange {
  constructor(public readonly range: Range) {}
}

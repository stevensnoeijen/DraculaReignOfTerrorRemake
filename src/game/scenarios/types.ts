import { Engine } from '../Engine';

import { Scenario } from './Scenario';

export type ScenarioConstructor<T extends Scenario = Scenario> = new (
  engine: Engine
) => T;

export type Grid = number[][];

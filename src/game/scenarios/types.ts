import * as PIXI from 'pixi.js';

import { Engine } from '../Engine';

import { Scenario } from './Scenario';

export type ScenarioConstructor<T extends Scenario = Scenario> = new (
  app: PIXI.Application,
  engine: Engine
) => T;

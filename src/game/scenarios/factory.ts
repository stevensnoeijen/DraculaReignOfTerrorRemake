import { RandomUnitsScenario } from './RandomUnitsScenario';
import { PathFindingScenario } from './PathFindingScenario';
import { BehaviorTreeScenario } from './BehaviorTreeScenario';
import { ScenarioConstructor } from './types';

export const DEFAULT_SCENARIO = RandomUnitsScenario;

const map = new Map<string, ScenarioConstructor>([
  ['randomunits', RandomUnitsScenario],
  ['pathfinding', PathFindingScenario],
  ['behaviortree', BehaviorTreeScenario],
]);

export const constructorByName = (name: string): ScenarioConstructor | null =>
  map.get(name) ?? null;

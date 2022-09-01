import { Scenario } from './scenarios/Scenario';

export interface ScenarioLoadedEvent {
  scenario: Scenario;
}

export type Events = ScenarioLoadedEvent;

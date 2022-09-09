import { Scenario } from '~/game/scenarios/Scenario';

export class ScenarioLoaded {
  constructor(
    public readonly scenario: Scenario
  ) {}
}

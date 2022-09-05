import * as PIXI from 'pixi.js';
import { buildWorld, Entity, IWorld } from 'sim-ecs';
import { nanoid } from 'nanoid';

import { gameSchedule } from './states/gameSchedule';
import { getOptions, Options } from './utils';
import { EventBus } from './EventBus';
import { Events } from './Events';
import { AnimationService } from './animation/AnimationService';
import { AnimationModelsJson } from './animation/api';
import { Scenario } from './scenarios/Scenario';
import { GameState } from './states/GameState';
import * as scenarios from './scenarios/factory';
import { ScenarioConstructor } from './scenarios/types';

Entity.uuidFn = nanoid;

export class Engine {
  public readonly world: IWorld;
  // TODO: should load this "safer"
  private _animationService!: AnimationService;
  private options: Options;

  public scenario: Scenario | null = null;

  constructor(private readonly app: PIXI.Application) {
    this.world = buildWorld()
      .withComponents(PIXI.Graphics, PIXI.Sprite, PIXI.AnimatedSprite)
      .withStateScheduling(GameState, root => root.fromPrefab(gameSchedule))
      .build();
    this.world.addResource(app);
    this.world.addResource(this);

    const eventBus = new EventBus<Events>();
    this.world.addResource(eventBus);

    this.options = getOptions();
    this.world.addResource(this.options);

    this.app.loader
      .add('unit-spritesheet', 'assets/unit-spritesheet.json')
      .add('animation-models', 'assets/animation-models.json');
  }

  public get animationService(): AnimationService {
    return this._animationService;
  }

  public async run() {
    this.app.loader
      .load(() => {
        this._animationService = new AnimationService(
          this.app.loader.resources['unit-spritesheet'].spritesheet!,
          this.app.loader.resources['animation-models'].data as AnimationModelsJson
        );
        this.loadScenario();
      });
  }

  private async loadScenario() {
    const scenarioConstructor = this.getScenarioConstructor();
    this.scenario = new scenarioConstructor(this.app, this);

    this.world.run({
      initialState: GameState,
    });
  }

  private getScenarioConstructor(): ScenarioConstructor {
    if (this.options.scenario == null || this.options.scenario[0] == null)
      return scenarios.DEFAULT_SCENARIO;

    const scenarioName = this.options.scenario[0].toLowerCase();
    const scenarioConstructor = scenarios.constructorByName(scenarioName);
    if (scenarioConstructor == null) {
      throw new Error('scenario not found');
    }

    return scenarioConstructor;
  }
}

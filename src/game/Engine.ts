import * as PIXI from 'pixi.js';
import { buildWorld, Entity, IWorld } from 'sim-ecs';
import { nanoid } from 'nanoid';

import { gameSchedule } from './states/gameSchedule';
import { getOptions, Options } from './utils';
import { RandomUnitsScenario } from './scenarios/RandomUnitsScenario';
import { PathFindingScenario } from './scenarios/PathFindingScenario';
import { BehaviorTreeScenario } from './scenarios/BehaviorTreeScenario';
import { EventBus } from './EventBus';
import { Events } from './Events';
import { AnimationService } from './animation/AnimationService';
import { AnimationModelsJson } from './animation/api';
import { Scenario } from './scenarios/Scenario';
import { GameState } from './states/GameState';

Entity.uuidFn = nanoid;

export class Engine {
  public readonly world: IWorld;
  // TODO: should load this "safer"
  private _animationService!: AnimationService;
  private options: Options;

  private readonly eventBus: EventBus<Events>;

  constructor(private readonly app: PIXI.Application) {
    this.world = buildWorld()
      .withComponents(PIXI.Graphics, PIXI.Sprite, PIXI.AnimatedSprite)
      .withStateScheduling(GameState, root => root.fromPrefab(gameSchedule))
      .build();
    this.world.addResource(app);
    this.world.addResource(this);

    const eventBus = this.eventBus = new EventBus<Events>();
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

  public scenario: Scenario | null = null;

  private async loadScenario() {
    if (this.options.scenario != null && this.options.scenario[0] != null) {
      const scenarioName = this.options.scenario[0].toLowerCase();
      if (scenarioName === 'randomunits') {
        this.scenario = new RandomUnitsScenario(this.app, this);
      } else if (scenarioName === 'pathfinding') {
        this.scenario = new PathFindingScenario(this.app, this);
      } else if (scenarioName === 'behaviortree') {
        this.scenario = new BehaviorTreeScenario(this.app, this);
      } else {
        alert('scenario not found');
        return;
      }
    } else {
      // default
      this.scenario = new RandomUnitsScenario(this.app, this);
  }

    this.world.run({
      initialState: GameState,
    });
  }
}

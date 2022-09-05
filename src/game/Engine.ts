import * as PIXI from 'pixi.js';
import { buildWorld, Entity, IEntity, IWorld } from 'sim-ecs';
import { nanoid } from 'nanoid';

import { gameSchedule } from './states/gameSchedule';
import { Follow } from './components/ai/Follow';
import { Transform } from './components/Transform';
import { Selectable } from './components/input/Selectable';
import { MouseControlled } from './components/input/MouseControlled';
import { MoveVelocity } from './components/movement/MoveVelocity';
import { getOptions, Options, Position, randomRotation } from './utils';
import { RandomUnitsScenario } from './scenarios/RandomUnitsScenario';
import { PathFindingScenario } from './scenarios/PathFindingScenario';
import { BehaviorTreeScenario } from './scenarios/BehaviorTreeScenario';
import { Collider } from './components/Collider';
import { EventBus } from './EventBus';
import { ScenarioLoadedEvent, Events } from './Events';
import { Combat } from './components/ai/Combat';
import { Target } from './components/ai/Target';
import { Controlled } from './components/input/Controlled';
import { AnimationService } from './animation/AnimationService';
import { AnimationModelsJson } from './animation/api';
import { Team } from './components/Team';
import { Alive } from './components/Alive';
import { Health } from './components/Health';
import { Vector2 } from './math/Vector2';
import { Size } from './components/Size';
import { Constants } from './Constants';
import { MovePositionDirect } from './components/movement/MovePositionDirect';
import { MovePath } from './components/movement/MovePath';
import { Scenario } from './scenarios/Scenario';
import { GameState } from './states/GameState';

export interface IUnitProps {
  color: 'red' | 'blue';
  position: Position;
  team: {
    number: number;
  };
}

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

  public createUnit(props: IUnitProps): IEntity {
    const sprite = new PIXI.AnimatedSprite([PIXI.Texture.EMPTY]);
    const animator = this.animationService.createAnimator(
      sprite,
      props.color,
      'swordsmen'
    );
    sprite.textures = animator.model.getAnimation('idle', 'north').textures;

    sprite.anchor.set(0.5);
    sprite.position.set(props.position.x, props.position.y);
    sprite.animationSpeed = 0.25;
    sprite.play();

    return this.world.buildEntity()
      .with(
        new Transform(
          new Vector2(props.position.x, props.position.y),
          randomRotation()
        )
      )
      .with(new Team(props.team.number))
      .with(new Alive(true))
      .with(new Health({
        points: 10,
        maxPoints: 10,
      }))
      .with(new PIXI.Graphics())
      .with(sprite)
      .with(animator)
      .with(Collider)
      .with(new Size(Constants.CELL_SIZE, Constants.CELL_SIZE))
      .with(new MoveVelocity(50))
      .with(MovePositionDirect)
      .with(new MovePath([]))
      .with(new Selectable(false))
      .with(Controlled)
      .with(MouseControlled)
      .with(Follow)
      .with(Target)
      .with(new Combat(80, 16, 1))
      .build();
  }

  private async loadScenario() {
    let scenario: Scenario;
    if (this.options.scenario != null && this.options.scenario[0] != null) {
      const scenarioName = this.options.scenario[0].toLowerCase();
      if (scenarioName === 'randomunits') {
        scenario = new RandomUnitsScenario(this.app, this);
      } else if (scenarioName === 'pathfinding') {
        scenario = new PathFindingScenario(this.app, this);
      } else if (scenarioName === 'behaviortree') {
        scenario = new BehaviorTreeScenario(this.app, this);
      } else {
        alert('scenario not found');
        return;
      }
    } else {
      // default
      scenario = new RandomUnitsScenario(this.app, this);
  }

    this.world.run({
      initialState: GameState,
    });
    scenario.load();
    // TODO: remove temp solution for register listener in MouseControlledSystem
    setTimeout(() => {
      this.eventBus.emit<ScenarioLoadedEvent>('scenario:loaded', { scenario: scenario });
    }, 100);
  }
}

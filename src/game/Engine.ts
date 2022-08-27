import * as PIXI from 'pixi.js';
import { Entity, World } from 'ecsy';
import { buildWorld, IWorld } from 'sim-ecs';

import { EcsyEntity } from './components/EcsyEntity';
import { AliveSystem } from './systems/AliveSystem';
import { SimEcsComponent } from './systems/SimEcsComponent';
import { TransformComponent } from './systems/TransformComponent';
import { SizeComponent } from './systems/SizeComponent';
import { SelectableComponent } from './systems/selection/SelectableComponent';
import { MovableComponent } from './systems/movement/MovableComponent';
import { HealthComponent } from './systems/health/HealthComponent';
import { MoveTransformVelocityComponent } from './systems/movement/MoveTransformVelocityComponent';
import { MovePositionDirectComponent } from './systems/movement/MovePositionDirectComponent';
import { PlayerMovementMouseComponent } from './systems/player/PlayerMovementMouseComponent';
import { PlayerMovementKeysComponent } from './systems/player/PlayerMovementKeysComponent';
import { MoveVelocityComponent } from './systems/movement/MoveVelocityComponent';
import { PlayerSelectionSystem } from './systems/selection/PlayerSelectionSystem';
import { HealthSystem } from './systems/health/HealthSystem';
import { InputSystem } from './systems/InputSystem';
import { MovePositionDirectSystem } from './systems/movement/MovePositionDirectSystem';
import { PlayerMovementMouseSystem } from './systems/player/PlayerMovementMouseSystem';
import { MoveVelocitySystem } from './systems/movement/MoveVelocitySystem';
import { SpriteComponent } from './systems/render/sprite/SpriteComponent';
import { SpriteSystem } from './systems/render/sprite/SpriteSystem';
import { GraphicsComponent } from './systems/render/graphics/GraphicsComponent';
import { GraphicsSystem } from './systems/render/graphics/GraphicsSystem';
import { GridSystem } from './systems/render/GridSystem';
import { getOptions } from './utils';
import { RandomUnitsLevel } from './levels/RandomUnitsLevel';
import { PathFindingLevel } from './levels/PathFindingLevel';
import { BehaviorTreeLevel } from './levels/BehaviorTreeLevel';
import { MapSystem } from './systems/render/MapSystem';
import { MovePathComponent } from './systems/movement/MovePathComponent';
import { MovePathSystem } from './systems/movement/MovePathSystem';
import { CollidableComponent } from './systems/movement/CollidableComponent';
import { EventBus } from './EventBus';
import { LevelLoadedEvent, Events } from './Events';
import { GameTimeSystem } from './systems/GameTimeSystem';
import { AttackComponent } from './systems/AttackComponent';
import { FollowComponent } from './systems/movement/FollowComponent';
import { FollowSystem } from './systems/movement/FollowSystem';
import { BehaviorTreeComponent } from './systems/ai/BehaviorTreeComponent';
import { BehaviorTreeSystem } from './systems/ai/BehaviorTreeSystem';
import { TargetComponent } from './systems/ai/TargetComponent';
import { TargetSystem } from './systems/ai/TargetSystem';
import { ControlledComponent } from './systems/ControlledComponent';
import { AnimatedSpriteComponent } from './systems/render/sprite/AnimatedSpriteComponent';
import { AssetComponent } from './systems/render/AssetComponent';
import { AnimationService } from './animation/AnimationService';
import { AnimationModelsJson } from './animation/api';
import { EntityFactory, IUnitProps } from './EntityFactory';
import { Team } from './components/Team';
import { Alive } from './components/Alive';

export class Engine {
  // TODO: rename after migration of ecsy, also update tests
  public readonly newWorld: IWorld;
  public readonly world: World;
  // TODO: should load this "safer"
  private _animationService!: AnimationService;
  // TODO: should load this "safer" and make readonly
  private entityFactory!: EntityFactory;

  private readonly eventBus: EventBus<Events>;

  constructor(private readonly app: PIXI.Application) {
    this.world = new World();

    this.newWorld = buildWorld()
      .withDefaultScheduling(root =>
        root.addNewStage(stage =>
          stage.addSystem(AliveSystem)
        )
      )
      .withComponents(EcsyEntity, Team, Alive)
      .build();
    const eventBus = (this.eventBus = new EventBus<Events>());

    let lastFrameTime = 0;

    const options = getOptions();

    lastFrameTime = performance.now();
    this.app.ticker.add(() => {
      frame();
    });

    this.app.loader
      .add('unit-spritesheet', 'assets/unit-spritesheet.json')
      .add('animation-models', 'assets/animation-models.json')
      .load(() => {
        this._animationService = new AnimationService(
          app.loader.resources['unit-spritesheet'].spritesheet!,
          app.loader.resources['animation-models'].data as AnimationModelsJson
        );
        this.entityFactory = new EntityFactory(this.world, this.animationService);
        loadLevel();
      });

    this.world
      .registerComponent(TransformComponent)
      .registerComponent(SizeComponent)
      .registerComponent(SelectableComponent)
      .registerComponent(MovableComponent)
      .registerComponent(HealthComponent)
      .registerComponent(MoveTransformVelocityComponent)
      .registerComponent(MovePositionDirectComponent)
      .registerComponent(PlayerMovementMouseComponent)
      .registerComponent(PlayerMovementKeysComponent)
      .registerComponent(MoveVelocityComponent)
      .registerComponent(SpriteComponent)
      .registerComponent(AnimatedSpriteComponent)
      .registerComponent(GraphicsComponent)
      .registerComponent(MovePathComponent)
      .registerComponent(CollidableComponent)
      .registerComponent(AttackComponent)
      .registerComponent(FollowComponent)
      .registerComponent(BehaviorTreeComponent)
      .registerComponent(TargetComponent)
      .registerComponent(ControlledComponent)
      .registerComponent(AssetComponent)
      .registerComponent(SimEcsComponent)
      .registerSystem(PlayerSelectionSystem, { app, eventBus })
      .registerSystem(HealthSystem, { eventBus })
      .registerSystem(InputSystem, { canvas: app.view })
      // .registerSystem(PlayerMovementKeysSystem, { eventBus }) // disabled for now, not working with (map) collision atm
      .registerSystem(MovePositionDirectSystem)
      .registerSystem(PlayerMovementMouseSystem, { app, eventBus })
      .registerSystem(MoveVelocitySystem, { eventBus })
      .registerSystem(SpriteSystem, { app, eventBus })
      .registerSystem(GraphicsSystem, { app, options, eventBus })
      .registerSystem(GridSystem, { app, options, eventBus })
      .registerSystem(MapSystem, { app, eventBus })
      .registerSystem(MovePathSystem, { eventBus })
      .registerSystem(GameTimeSystem)
      .registerSystem(FollowSystem, { app, eventBus })
      .registerSystem(BehaviorTreeSystem)
      .registerSystem(TargetSystem);

    let level;
    const loadLevel = (): void => {
      if (options.level != null && options.level[0] != null) {
        const levelName = options.level[0].toLowerCase();
        if (levelName === 'randomunits') {
          level = new RandomUnitsLevel(app, this);
        } else if (levelName === 'pathfinding') {
          level = new PathFindingLevel(app, this);
        } else if (levelName === 'behaviortree') {
          level = new BehaviorTreeLevel(app, this);
        } else {
          alert('level not found');
          return;
        }
      } else {
        // default
        level = new RandomUnitsLevel(app, this);
      }

      this.newWorld.run();
      level.load();
      eventBus.emit<LevelLoadedEvent>('level:loaded', { level });
    };

    const frame = (): void => {
      // Compute delta and elapsed time
      const time = performance.now();
      const delta = time - lastFrameTime;

      // Run all the systems
      this.world.execute(delta, time);

      lastFrameTime = time;
    };
  }

  public get animationService(): AnimationService {
    return this._animationService;
  }

  public createUnit(props: IUnitProps): Entity {
    const entity = this.entityFactory.createUnit(props);

    const simEcsEntity = this.newWorld.buildEntity()
      .with(new EcsyEntity(entity))
      .with(new Team(props.team.number))
      .with(new Alive(true))
      .build();

    entity.addComponent(SimEcsComponent, {
      entity: simEcsEntity,
    });

    return entity;
  }
}

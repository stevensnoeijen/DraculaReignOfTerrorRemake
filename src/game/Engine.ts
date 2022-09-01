import * as PIXI from 'pixi.js';
import { Entity, World } from 'ecsy';
import { buildWorld, IWorld } from 'sim-ecs';

import { EcsyEntity } from './components/EcsyEntity';
import { AliveSystem } from './systems/AliveSystem';
import { SimEcsComponent } from './systems/SimEcsComponent';
import { Transform } from './components/Transform';
import { Selectable } from './components/player/Selectable';
import { PlayerMovementMouseComponent } from './systems/player/PlayerMovementMouseComponent';
import { PlayerMovementKeysComponent } from './systems/player/PlayerMovementKeysComponent';
import { MoveVelocity } from './components/movement/MoveVelocity';
import { MouseSelectionSystem } from './systems/input/MouseSelectionSystem';
import { HealthSystem } from './systems/HealthSystem';
import { InputSystem } from './systems/InputSystem';
import { MovePositionDirectSystem } from './systems/movement/MovePositionDirectSystem';
import { PlayerMovementMouseSystem } from './systems/player/PlayerMovementMouseSystem';
import { MoveVelocitySystem } from './systems/movement/MoveVelocitySystem';
import { SpriteSystem } from './systems/pixi/SpriteSystem';
import { GraphicsSystem } from './systems/pixi/GraphicsSystem';
import { GridSystem } from './systems/render/GridSystem';
import { getOptions, randomRotation } from './utils';
import { RandomUnitsLevel } from './levels/RandomUnitsLevel';
import { PathFindingLevel } from './levels/PathFindingLevel';
import { BehaviorTreeLevel } from './levels/BehaviorTreeLevel';
import { MapSystem } from './systems/render/MapSystem';
import { MovePathSystem } from './systems/movement/MovePathSystem';
import { Collider } from './components/Collider';
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
import { AnimationService } from './animation/AnimationService';
import { AnimationModelsJson } from './animation/api';
import { EntityFactory, IUnitProps } from './EntityFactory';
import { Team } from './components/Team';
import { Alive } from './components/Alive';
import { Health } from './components/Health';
import { Vector2 } from './math/Vector2';
import { Size } from './components/Size';
import { Constants } from './Constants';
import { MovePositionDirect } from './components/movement/MovePositionDirect';
import { MovePath } from './components/movement/MovePath';

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
      .withComponents(PIXI.Graphics, PIXI.Sprite, PIXI.AnimatedSprite)
      .withDefaultScheduling(root =>
        root.addNewStage(stage => {
          stage.addSystem(AliveSystem);
          stage.addSystem(HealthSystem);
          stage.addSystem(GraphicsSystem);
          stage.addSystem(SpriteSystem);
          stage.addSystem(MoveVelocitySystem);
          stage.addSystem(MovePositionDirectSystem);
          stage.addSystem(MovePathSystem);
          stage.addSystem(MouseSelectionSystem);
        })
      )
      .withComponents(EcsyEntity, Team, Alive)
      .build();
    this.newWorld.addResource(app);

    const eventBus = (this.eventBus = new EventBus<Events>());

    let lastFrameTime = 0;

    const options = getOptions();
    this.newWorld.addResource(options);

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
      .registerComponent(PlayerMovementMouseComponent)
      .registerComponent(PlayerMovementKeysComponent)
      .registerComponent(AttackComponent)
      .registerComponent(FollowComponent)
      .registerComponent(BehaviorTreeComponent)
      .registerComponent(TargetComponent)
      .registerComponent(ControlledComponent)
      .registerComponent(SimEcsComponent)
      .registerSystem(InputSystem, { canvas: app.view })
      // .registerSystem(PlayerMovementKeysSystem, { eventBus }) // disabled for now, not working with (map) collision atm
      .registerSystem(PlayerMovementMouseSystem, { app, eventBus })
      .registerSystem(GridSystem, { app, options, eventBus })
      .registerSystem(MapSystem, { app, eventBus })
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

    const simEcsEntity = this.newWorld.buildEntity()
      .with(
        new Transform(
          new Vector2(props.position.x, props.position.y),
          randomRotation()
        )
      )
      .with(new EcsyEntity(entity))
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
      .build();

    entity.addComponent(SimEcsComponent, {
      entity: simEcsEntity,
    });

    return entity;
  }
}

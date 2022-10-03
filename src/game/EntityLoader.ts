import * as PIXI from 'pixi.js';
import { IWorld } from 'sim-ecs';

import {
  SpriteRender,
  Combat,
  Transform,
  Team,
  Alive,
  Health,
  Collision,
  MoveVelocity,
  MovePositionDirect,
  MovePath,
  Selectable,
  Controlled,
  MouseControlled,
  Follow,
  Target,
  UnitState,
  GraphicsRender,
  Sensory,
  BehaviorTree,
} from './components';
import { rotationToDirection } from './animation/load';
import { EntityDefinitions } from './data/EntityDefinitions';
import { SoundService } from './sounds/SoundService';
import { AnimationService } from './animation/AnimationService';
import { Point } from './math/types';
import { Vector2 } from './math/Vector2';
import { CELL_SIZE } from './constants';
import { Unit } from './data/Unit';
import { randomRotation } from './utils/components/transform';
import { UnitType } from './types';
import { Sensor } from './ai/sensor/Sensor';
import { createSwordsmanTree } from './ai/behaviortree/trees';
import { UNIT_SWORDSMEN } from './data/constants';
import { Attack } from './combat/Attack';
import { Aggro } from './combat/Aggro';
import { CombatController } from './combat/CombatController';

export interface IUnitProps {
  team: Team;
  position: Point;
}

export class EntityLoader {
  constructor(
    private readonly world: IWorld,
    private readonly entityDefinitions: EntityDefinitions,
    private readonly animationService: AnimationService,
    private readonly soundService: SoundService
  ) {}

  public createUnit(name: string, props: IUnitProps): void {
    const data = this.getData(name);

    const sprite = new PIXI.AnimatedSprite([PIXI.Texture.EMPTY]);
    const animations = this.animationService.createComponent(
      sprite,
      props.team.color,
      data.spriteModel as UnitType
    );
    const rotation = randomRotation();
    sprite.textures = animations.animator.model.getAnimation(
      'idle',
      rotationToDirection(rotation)
    ).textures;

    sprite.anchor.set(0.5);
    sprite.position.set(props.position.x, props.position.y);
    sprite.animationSpeed = 0.25;
    sprite.play();

    const size = {
      width: CELL_SIZE,
      height: CELL_SIZE,
    };

    const builder = this.world
      .buildEntity()
      .with(
        new Transform(new Vector2(props.position.x, props.position.y), rotation)
      )
      .with(props.team)
      .with(new Alive(true))
      .with(
        new Health({
          points: data.healthPointsMax,
          maxPoints: data.healthPointsMax,
        })
      )
      .with(new GraphicsRender(new PIXI.Graphics()))
      .with(new SpriteRender(sprite), size)
      .with(animations)
      .with(new Collision(size))
      .with(new MoveVelocity(8))
      .with(MovePositionDirect)
      .with(new MovePath([]))
      .with(new Selectable(false))
      .with(Controlled)
      .with(Follow)
      .with(Target)
      .with(
        new Combat(
          new CombatController({
            aggro: new Aggro(data.combatAggroRange),
            attack: new Attack({
              range: data.combatAttackRange,
              damage: data.combatAttackDamage,
              cooldownTime: data.combatAttackCooldown,
            }),
          })
        )
      )
      .with(UnitState)
      .with(this.soundService.createComponent(data))
      .with(new Sensory(new Sensor(data.combatAggroRange.max)));

    if (props.team.equals(Team.PLAYER)) builder.with(MouseControlled);

    const entity = builder.build();

    if (name === UNIT_SWORDSMEN)
      entity.addComponent(new BehaviorTree(createSwordsmanTree(entity)));
  }

  private getData(name: string): Unit {
    const object = this.entityDefinitions.definitions.find(
      (object) => object.name === name
    );
    if (object == null) throw new Error(`Unit with name ${name} not existend`);

    return Unit.fromJson(object);
  }
}

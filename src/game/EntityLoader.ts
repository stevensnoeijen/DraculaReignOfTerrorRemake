import * as PIXI from 'pixi.js';
import { IWorld } from 'sim-ecs';

import { ObjectsJson } from './data/ObjectsJson';
import { SoundService } from './sounds/SoundService';
import { Combat } from './components/ai/Combat';
import { AnimationService } from './animation/AnimationService';
import { Position, randomRotation } from './utils';
import { Transform } from './components/Transform';
import { Vector2 } from './math/Vector2';
import { Team } from './components/Team';
import { Alive } from './components/Alive';
import { Health } from './components/Health';
import { Collider } from './components/Collider';
import { Size } from './components/Size';
import { MoveVelocity } from './components/movement/MoveVelocity';
import { MovePositionDirect } from './components/movement/MovePositionDirect';
import { Constants } from './Constants';
import { MovePath } from './components/movement/MovePath';
import { Selectable } from './components/input/Selectable';
import { Controlled } from './components/input/Controlled';
import { MouseControlled } from './components/input/MouseControlled';
import { Follow } from './components/ai/Follow';
import { Target } from './components/ai/Target';
import { UnitState } from './components/UnitState';
import { Unit } from './data/Unit';

export interface IUnitProps {
  color: 'red' | 'blue';
  position: Position;
  team: {
    number: number;
  };
}

export class EntityLoader {
  constructor(
    private readonly world: IWorld,
    private readonly objects: ObjectsJson,
    private readonly animationService: AnimationService,
    private readonly soundService: SoundService,
  ) {

  }

  public createUnit(name: string, props: IUnitProps): void {
    const data = this.getData(name);

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

    this.world.commands.buildEntity()
      .with(
        new Transform(
          new Vector2(props.position.x, props.position.y),
          randomRotation()
        )
      )
      .with(new Team(props.team.number))
      .with(new Alive(true))
      .with(new Health({
        points: data.healthPointsMax,
        maxPoints: data.healthPointsMax,
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
      .with(new Combat(
        data.combatAggroRange,
        data.combatAttackRange,
        data.combatAttackDamage
      ))
      .with(UnitState)
      .with(this.soundService.createComponent(data))
      .build();

      this.world.flushCommands();// TODO: optimise this
  }

  private getData(name: string): Unit {
    const object = this.objects.find((object) => object.name === name);
    if (object == null) throw new Error(`Unit with name ${name} not existend`);

    return Unit.fromJson(object);
  }
}

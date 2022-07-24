import * as PIXI from 'pixi.js';
import { World } from 'ecsy';

import { cellPositionToVector } from '../utils';
import { Level } from './Level';
import { EntityFactory } from '../EntityFactory';
import { createEmptyGrid, getGridSizeByScreen } from './utils';
import { BehaviorTreeComponent } from './../systems/ai/BehaviorTreeComponent';
import { Tree } from '../ai/behaviortree/Tree';
import {
  Selector,
  Timer,
  Inventer,
  Sequence,
} from './../ai/behaviortree/nodes/core';
import {
  Follow,
  Attack,
  IsControlledByPlayer,
  IsEnemyInAttackRange,
  HasTarget,
  UnsetTarget,
  IsMoving,
  SetTarget,
  IsEnemyInAggroRange,
} from './../ai/behaviortree/nodes/entity';
import * as animations from '../animation/utils';

export class BehaviorTreeLevel extends Level {
  private map: number[][];
  private readonly entityFactory: EntityFactory;

  public readonly unitAnimations: animations.UnitAnimations;

  constructor(app: PIXI.Application, world: World) {
    super(app, world);

    this.map = createEmptyGrid(getGridSizeByScreen(app));
    this.unitAnimations = animations.load(
      app.loader.resources.unit.spritesheet!
    );
    this.entityFactory = new EntityFactory(world, this.unitAnimations);
  }

  public get collisionMap(): number[][] {
    return this.map;
  }

  public load(): void {
    const player = this.entityFactory.createUnit({
      position: cellPositionToVector(1, 1),
      color: 'blue',
      team: {
        number: 1,
      },
    });

    const enemy = this.entityFactory.createUnit({
      position: cellPositionToVector(1, 3),
      color: 'red',
      team: {
        number: 2,
      },
    });

    const entities = [player, enemy];

    const tree = new Tree(
      new Selector([
        new Sequence([
          new Inventer([new HasTarget()]),
          new IsEnemyInAggroRange(entities),
          new SetTarget(),
        ]),
        new Sequence([
          new IsMoving(),
          new Inventer([new IsEnemyInAggroRange(entities)]),
          new UnsetTarget(),
        ]),
        new Sequence([
          new HasTarget(),
          new Selector([
            new Sequence([
              new IsEnemyInAttackRange(entities),
              new Timer({
                delay: 1000,
                children: [new Attack()],
              }),
            ]),
            new Sequence([
              new Inventer([new IsControlledByPlayer()]),
              new Follow(),
            ]),
          ]),
        ]),
      ])
    );
    tree.root.setData('entity', player);

    player.addComponent(BehaviorTreeComponent, {
      tree,
    });
  }
}

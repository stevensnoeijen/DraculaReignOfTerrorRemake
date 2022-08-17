import * as PIXI from 'pixi.js';
import { World } from 'ecsy';

import { cellPositionToVector } from '../utils';
import { EntityFactory } from '../EntityFactory';
import { Tree } from '../ai/behaviortree/Tree';
import { AnimationManager } from '../animation/AnimationManager';
import { UnitSpriteModelsJson } from '../animation/api';

import { Level } from './Level';
import { createEmptyGrid, getGridSizeByScreen } from './utils';
import { BehaviorTreeComponent } from './../systems/ai/BehaviorTreeComponent';
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

export class BehaviorTreeLevel extends Level {
  private map: number[][];
  private readonly entityFactory: EntityFactory;
  private readonly animationManager: AnimationManager;

  constructor(app: PIXI.Application, world: World) {
    super(app, world);

    this.map = createEmptyGrid(getGridSizeByScreen(app));

    this.animationManager = new AnimationManager(
      app.loader.resources['unit-spritesheet'].spritesheet!,
      app.loader.resources['unit-sprite-models'].data as UnitSpriteModelsJson
    );
    this.entityFactory = new EntityFactory(world, this.animationManager);
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

import * as PIXI from 'pixi.js';

import { cellPositionToVector } from '../utils';
import { Tree } from '../ai/behaviortree/Tree';
import { Engine } from '../Engine';
import { BehaviorTree } from '../components/ai/BehaviorTree';
import {
  Selector,
  Timer,
  Inventer,
  Sequence,
  Parallel,
} from '../ai/behaviortree/nodes/core';
import {
  SetFollow,
  Attack,
  IsEnemyInAttackRange,
  HasTarget,
  UnsetTarget,
  IsMoving,
  SetTarget,
  IsEnemyInAggroRange,
} from '../ai/behaviortree/nodes/entity';
import { SendEvent } from '../ai/behaviortree/nodes/entity/SendEvent';
import { Attacked } from '../events/Attacked';
import { IsUnitState } from '../ai/behaviortree/nodes/entity/IsUnitState';
import { Hit } from '../events/Hit';

import { UNIT_SWORDSMEN } from './../objects/constants';
import { EntityLoader } from './../EntityLoader';
import { IsControlledBy } from './../ai/behaviortree/nodes/entity/IsControlledBy';
import { createEmptyGrid, getGridSizeByScreen } from './utils';
import { Scenario } from './Scenario';


export class BehaviorTreeScenario extends Scenario {
  private map: number[][];

  constructor(app: PIXI.Application, engine: Engine) {
    super(app, engine);

    this.map = createEmptyGrid(getGridSizeByScreen(app));
  }

  public get collisionMap(): number[][] {
    return this.map;
  }

  public load(entityLoader: EntityLoader): void {
    entityLoader.createUnit(UNIT_SWORDSMEN, {
      position: cellPositionToVector(1, 1),
      color: 'blue',
      team: {
        number: 1,
      },
    });

     entityLoader.createUnit(UNIT_SWORDSMEN, {
      position: cellPositionToVector(1, 3),
      color: 'red',
      team: {
        number: 2,
      },
    });

    const entities = Array.from(this.engine.world.getEntities());

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
        new Selector([
          new Sequence([
            new Inventer([new IsMoving()]),
            new IsEnemyInAttackRange(entities),
            new Parallel([
              new Sequence([
                new Inventer([new IsUnitState('attack')]),
                new SendEvent(Attacked),
                ]),
              new Timer({
                delay: 1000,
                execute: new Sequence([
                  new Attack(),
                  new SendEvent(Hit)
                ]),
              }),
            ])
          ]),
          new Sequence([
            new Inventer([new IsControlledBy('player')]),
            new SetFollow(),
          ]),
        ]),
      ])
    );
    tree.root.setData('entity', entities[0]);

    entities[0].addComponent(new BehaviorTree(tree));
  }
}

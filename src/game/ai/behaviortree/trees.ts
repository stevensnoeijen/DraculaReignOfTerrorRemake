import { IEntity } from 'sim-ecs';

import { IsControlledBy } from './nodes/entity/IsControlledBy';
import { Selector, Timer, Inverter, Sequence, Parallel } from './nodes/core';
import {
  SetFollow,
  Attack,
  IsEnemyInAttackRange,
  HasTarget,
  UnsetTarget,
  IsMoving,
  SetTarget,
  IsEnemyInAggroRange,
  IsUnitState,
  SendEvent,
} from './nodes/entity';
import { Tree } from './Tree';

import { Attacked, Hit } from '~/game/events';
import { Combat } from '~/game/components';

const DEFAULT_ATTACK_DELAY = 1000;

export const createSwordsmanTree = (entity: IEntity) => {
  const tree = new Tree(
    new Selector([
      new Sequence([
        new Inverter(new HasTarget()),
        new IsEnemyInAggroRange(),
        new SetTarget(),
      ]),
      new Sequence([
        new IsMoving(),
        new Selector([new Inverter(new IsEnemyInAggroRange())]),
        new UnsetTarget(),
      ]),
      new Selector([
        new Sequence([
          new Inverter(new IsMoving()),
          new IsEnemyInAttackRange(),
          new Parallel([
            new Sequence([
              new Inverter(new IsUnitState('attack')),
              new SendEvent(Attacked),
            ]),
            new Timer({
              delay:
                entity.getComponent(Combat)?.attackCooldown ??
                DEFAULT_ATTACK_DELAY,
              execute: new Sequence([new Attack(), new SendEvent(Hit)]),
            }),
          ]),
        ]),
        new Sequence([
          new Inverter(new IsControlledBy('player')),
          new SetFollow(),
        ]),
      ]),
    ])
  );
  tree.root.setData('entity', entity);

  return tree;
};

import { IEntity } from 'sim-ecs';

import { MoveToRandomDirection } from './nodes/entity/MoveToRandomDirection';
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

import { AttackStarted, Hit } from '~/game/events';
import { Combat } from '~/game/components';

const DEFAULT_ATTACK_DELAY = 1000;

const targetEnemyInAggroRange = () =>
  new Sequence([
    new Inverter(new HasTarget()),
    new IsEnemyInAggroRange(),
    new SetTarget(),
  ]);

const unsetTargetWhenMoving = () =>
  new Sequence([
    new IsMoving(),
    new Inverter(new IsEnemyInAggroRange()),
    new UnsetTarget(),
  ]);

const attackEnemyWhenInAttackRange = (entity: IEntity) =>
  new Sequence([
    new Inverter(new IsMoving()),
    new IsEnemyInAttackRange(),
    new Parallel([
      new Sequence([
        new Inverter(new IsUnitState('attack')),
        new SendEvent(AttackStarted),
      ]),
      new Timer({
        delay:
          entity.getComponent(Combat)?.attackCooldown ?? DEFAULT_ATTACK_DELAY,
        execute: new Sequence([new Attack(), new SendEvent(Hit)]),
      }),
    ]),
  ]);

const setFollowWhenNotControlledByPlayer = () =>
  new Sequence([new Inverter(new IsControlledBy('player')), new SetFollow()]);

const wander = () =>
  new Timer({
    delay: 5000,
    passedTime: Math.random() * 5000 - 5000,
    execute: new Sequence([new MoveToRandomDirection()]),
  });

export const createSwordsmanTree = (entity: IEntity) => {
  const tree = new Tree(
    new Selector([
      targetEnemyInAggroRange(),
      unsetTargetWhenMoving(),
      attackEnemyWhenInAttackRange(entity),
      setFollowWhenNotControlledByPlayer(),
      wander(),
    ])
  );
  tree.root.setData('entity', entity);

  return tree;
};

import { createSystem, queryComponents, Read, ReadEvents } from 'sim-ecs';

import { StoppedMoving } from '../events/StoppedMoving';
import { StoppedAttacking } from '../events/StoppedAttacking';

import { StartedAttacking } from './../events/StartedAttacking';
import { StartedMoving } from './../events/StartedMoving';
import { Died } from './../events/Died';
import { Animator } from './../animation/Animator';
import { setEntityAnimation } from './utils/animation';

export const AnimatorSystem = createSystem({
    startedMoving: ReadEvents(StartedMoving),
    stoppedMoving: ReadEvents(StoppedMoving),
    startedAttacking: ReadEvents(StartedAttacking),
    stoppedAttacking: ReadEvents(StoppedAttacking),
    died: ReadEvents(Died),

    query: queryComponents({
      animator: Read(Animator),
    }),
  }).withRunFunction(({
    startedMoving,
    stoppedMoving,
    startedAttacking,
    stoppedAttacking,
    died,

    query
  }) => {
    startedMoving.execute(event => {
      setEntityAnimation(event.entity, 'move');
    });
    stoppedMoving.execute(event => {
      setEntityAnimation(event.entity, 'idle');
    });
    startedAttacking.execute(event => {
      setEntityAnimation(event.entity, 'attack');
    });
    stoppedAttacking.execute(event => {
      setEntityAnimation(event.entity, 'idle');
    });

    died.execute((event) => {
      if (!query.matchesEntity(event.entity)) return;

      setEntityAnimation(event.entity, 'dead');
   });
  })
  .build();

import { createSystem, queryComponents, Read, ReadEvents } from 'sim-ecs';

import { rotationToDirection } from '../animation/load';
import { Transform } from '../components/Transform';
import { StoppedMoving } from '../events/StoppedMoving';

import { StartedMoving } from './../events/StartedMoving';
import { Died } from './../events/Died';
import { Animator } from './../animation/Animator';
import { setEntityAnimation } from './utils/animation';

export const AnimatorSystem = createSystem({
    startedMoving: ReadEvents(StartedMoving),
    stoppedMoving: ReadEvents(StoppedMoving),
    died: ReadEvents(Died),

    query: queryComponents({
      animator: Read(Animator),
    }),
  }).withRunFunction(({
    startedMoving,
    stoppedMoving,
    died,

    query
  }) => {
    startedMoving.execute((event) => {
      console.log('receive started moving');
      setEntityAnimation(event.entity, 'move');
    });
    stoppedMoving.execute((event) => {
      console.log('receive stopped moving');
      setEntityAnimation(event.entity, 'idle');
    });

    died.execute((event) => {
      console.log('handle died');
      if (!query.matchesEntity(event.entity)) return;

      event.entity.getComponent(Animator)!.set(
        'dead',
        rotationToDirection(event.entity.getComponent(Transform)!.rotation)
      );
   });
  })
  .build();

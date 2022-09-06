import { createSystem, queryComponents, Read, ReadEvents } from 'sim-ecs';

import { Idled } from '../events/Idled';
import { Moved } from '../events/Moved';
import { Attacked } from '../events/Attacked';

import { Died } from './../events/Died';
import { Animator } from './../animation/Animator';
import { setEntityAnimation } from './utils/animation';

export const AnimatorSystem = createSystem({
    idled: ReadEvents(Idled),
    moved: ReadEvents(Moved),
    attacked: ReadEvents(Attacked),
    died: ReadEvents(Died),

    query: queryComponents({
      animator: Read(Animator),
    }),
  }).withRunFunction(({
    moved,
    idled,
    attacked,
    died,

    query
  }) => {
    moved.execute(event => {
      console.log('moved');
      setEntityAnimation(event.entity, 'move');
    });
    idled.execute(event => {
      console.log('idled');
      setEntityAnimation(event.entity, 'idle');
    });
    attacked.execute(event => {
      console.log('attacked');
      setEntityAnimation(event.entity, 'attack');
    });
    died.execute((event) => {
      console.log('handle died');
      if (!query.matchesEntity(event.entity)) return;

      setEntityAnimation(event.entity, 'dead');
   });
  })
  .build();

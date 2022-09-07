import { createSystem, IEntity, queryComponents, Read, ReadEvents } from 'sim-ecs';

import { Idled } from '../events/Idled';
import { Moved } from '../events/Moved';
import { Attacked } from '../events/Attacked';
import { UnitState } from '../types';
import { Transform } from '../components/Transform';
import { rotationToDirection } from '../animation/load';

import { Animations } from './../components/Animations';
import { Animator } from './../animation/Animator';
import { Died } from './../events/Died';

export const setAnimation = (entity: IEntity, state: UnitState): void => {
  if (!entity.hasComponent(Animations)) return;

  const transform = entity.getComponent(Transform);
  const direction = rotationToDirection(transform?.rotation ?? 0)!;

  entity.getComponent(Animations)!.animator.set(state, direction);
};

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
      setAnimation(event.entity, 'move');
    });
    idled.execute(event => {
      console.log('idled');
      setAnimation(event.entity, 'idle');
    });
    attacked.execute(event => {
      console.log('attacked');
      setAnimation(event.entity, 'attack');
    });
    died.execute((event) => {
      console.log('died');
      if (!query.matchesEntity(event.entity)) return;

      setAnimation(event.entity, 'dead');
   });
  })
  .build();

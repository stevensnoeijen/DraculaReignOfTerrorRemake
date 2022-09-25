import { createSystem, queryComponents, Read, ReadEvents } from 'sim-ecs';

import { Transform } from '../components/Transform';
import { rotationToDirection } from '../animation/load';
import { Died, AttackStarted, Moved, Idled } from '../events';
import { Animations } from '../components/Animations';
import { AttackStopped } from '../events/AttackStopped';
import { UnitState } from '../components';

import { Collided } from './../events/Collided';

export const AnimatorSystem = createSystem({
  idled: ReadEvents(Idled),
  moved: ReadEvents(Moved),
  attackedStarted: ReadEvents(AttackStarted),
  attackStopped: ReadEvents(AttackStopped),
  died: ReadEvents(Died),
  collided: ReadEvents(Collided),

  query: queryComponents({
    transform: Read(Transform),
    animations: Read(Animations),
    state: Read(UnitState),
  }),
})
  .withRunFunction(async ({ query }) => {
    await query.execute(({ transform, animations, state }) => {
      const direction = rotationToDirection(transform?.rotation ?? 0)!;

      animations.animator.set(state.state, direction);
    });
  })
  .build();

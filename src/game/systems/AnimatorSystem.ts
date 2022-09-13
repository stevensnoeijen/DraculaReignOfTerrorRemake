import {
  createSystem,
  IEntity,
  queryComponents,
  Read,
  ReadEvents,
} from 'sim-ecs';

import { UnitState } from '../types';
import { Transform } from '../components/Transform';
import { rotationToDirection } from '../animation/load';
import { Died, Attacked, Moved, Idled } from '../events';
import { Animations } from '../components/Animations';
import { Animator } from '../animation/Animator';

import { AttackStopped } from './../events/AttackedStopped';
import { Collided } from './../events/Collided';

export const setAnimation = (entity: IEntity, state: UnitState): void => {
  if (!entity.hasComponent(Animations)) return;

  const transform = entity.getComponent(Transform);
  const direction = rotationToDirection(transform?.rotation ?? 0)!;

  entity.getComponent(Animations)?.animator.set(state, direction);
};

export const AnimatorSystem = createSystem({
  idled: ReadEvents(Idled),
  moved: ReadEvents(Moved),
  attacked: ReadEvents(Attacked),
  attackStopped: ReadEvents(AttackStopped),
  died: ReadEvents(Died),
  collided: ReadEvents(Collided),

  query: queryComponents({
    animator: Read(Animator),
  }),
})
  .withRunFunction(
    async ({ moved, idled, attacked, attackStopped, died, collided }) => {
      await Promise.all([
        moved.execute((event) => setAnimation(event.entity, 'move')),
        idled.execute((event) => setAnimation(event.entity, 'idle')),
        attackStopped.execute((event) => setAnimation(event.entity, 'idle')),
        collided.execute((event) => setAnimation(event.entity, 'idle')),
        attacked.execute((event) => setAnimation(event.entity, 'attack')),
        died.execute((event) => setAnimation(event.entity, 'dead')),
      ]);
    }
  )
  .build();

import {
  createSystem,
  IEntity,
  queryComponents,
  Read,
  ReadEvents,
} from 'sim-ecs';
import { IEventReader } from 'sim-ecs/dist/events';

import { UnitState } from '../types';
import { Transform } from '../components/Transform';
import { rotationToDirection } from '../animation/load';
import { EntityEvent, Died, Attacked, Moved, Idled } from '../events';
import { Animations } from '../components/Animations';
import { Animator } from '../animation/Animator';

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
  died: ReadEvents(Died),

  query: queryComponents({
    animator: Read(Animator),
  }),
})
  .withRunFunction(({ moved, idled, attacked, died }) => {
    (
      [
        [moved, 'move'],
        [idled, 'idle'],
        [attacked, 'attack'],
        [died, 'dead'],
      ] as [IEventReader<typeof EntityEvent>, UnitState][]
    ).forEach(([eventReader, state]) => {
      eventReader.execute((event) => {
        setAnimation(event.entity, state);
      });
    });
  })
  .build();

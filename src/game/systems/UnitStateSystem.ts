import {
  createSystem,
  queryComponents,
  Write,
  ReadEvents,
  IEntity,
} from 'sim-ecs';
import { IEventReader } from 'sim-ecs/dist/events';

import { UnitState } from '../components/UnitState';
import { Idled } from '../events/Idled';
import { UnitState as State } from '../types';
import { Moved } from '../events/Moved';
import { Died } from '../events/Died';

import { EntityEvent } from '~/game/events/EntityEvent';
import { Attacked } from '~/game/events/Attacked';

const setState = (entity: IEntity, state: State) => {
  entity.getComponent(UnitState)!.state = state;
};

export const UnitStateSystem = createSystem({
  idled: ReadEvents(Idled),
  moved: ReadEvents(Moved),
  attacked: ReadEvents(Attacked),
  died: ReadEvents(Died),

  query: queryComponents({
    unitState: Write(UnitState),
  }),
})
  .withRunFunction(({ idled, moved, attacked, died }) =>
    (
      [
        [idled, 'idle'],
        [moved, 'move'],
        [attacked, 'attack'],
        [died, 'dead'],
      ] as [IEventReader<typeof EntityEvent>, State][]
    ).forEach(([eventReader, state]) =>
      eventReader.execute((event) => setState(event.entity, state))
    )
  )
  .build();

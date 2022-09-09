import { createSystem, queryComponents, Write, ReadEvents, IEntity } from 'sim-ecs';

import { UnitState } from '../components/UnitState';
import { Idled } from '../events/Idled';
import { UnitState as State } from '../types';
import { Moved } from '../events/Moved';
import { Died } from '../events/Died';

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
}).withRunFunction(({
  idled,
  moved,
  attacked,
  died,
}) => {
  idled.execute(event => setState(event.entity, 'idle'));
  moved.execute(event => setState(event.entity, 'move'));
  attacked.execute(event => setState(event.entity, 'attack'));
  died.execute(event => setState(event.entity, 'dead'));
})
.build();


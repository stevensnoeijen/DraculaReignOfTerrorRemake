import { createSystem, queryComponents, Write, ReadEvents, IEntity } from 'sim-ecs';

import { UnitState } from '../components/UnitState';
import { StoppedMoving } from '../events/StoppedMoving';
import { UnitState as State } from '../types';

import { StartedMoving } from './../events/StartedMoving';

import { StoppedAttacking } from '~/game/events/StoppedAttacking';
import { StartedAttacking } from '~/game/events/StartedAttacking';

const setState = (entity: IEntity, state: State) => {
  entity.getComponent(UnitState)!.state = state;
};

export const UnitStateSystem = createSystem({
  startedAttacking: ReadEvents(StartedAttacking),
  stoppedAttacking: ReadEvents(StoppedAttacking),
  startedMoving: ReadEvents(StartedMoving),
  stoppedMoving: ReadEvents(StoppedMoving),

  query: queryComponents({
    unitState: Write(UnitState),
  }),
}).withRunFunction(({
  startedAttacking,
  stoppedAttacking,
  startedMoving,
  stoppedMoving,
}) => {
  startedAttacking.execute(event => setState(event.entity, 'attack'));
  stoppedAttacking.execute(event => setState(event.entity, 'idle'));
  startedMoving.execute(event => setState(event.entity, 'move'));
  stoppedMoving.execute(event => setState(event.entity, 'idle'));
})
.build();


import { createSystem, ReadEvents } from 'sim-ecs';

import { AttackStarted } from '../events/AttackStarted';
import { Died } from '../events/Died';
import { Sounds } from '../components/Sounds';
import { Commanded } from '../events/Commanded';
import { EntityEvent } from '../events/EntityEvent';
import { Idled, Moved } from '../events';
import { AttackStopped } from '../events/AttackStopped';

import { Action } from './../sounds/SoundController';

const playSound = (event: EntityEvent, action: Action) => {
  event.entity.getComponent(Sounds)?.play(action);
};

const stopSound = (event: EntityEvent, action: Action) =>
  event.entity.getComponent(Sounds)?.stop(action);

export const SoundsSystem = createSystem({
  commanded: ReadEvents(Commanded),
  moved: ReadEvents(Moved),
  attackedStarted: ReadEvents(AttackStarted),
  attackStopped: ReadEvents(AttackStopped),
  died: ReadEvents(Died),
  idled: ReadEvents(Idled),
})
  .withRunFunction(
    ({ commanded, moved, attackedStarted, attackStopped, died }) => {
      commanded.execute((event) => {
        playSound(event, 'command');
      });
      moved.execute((event) => {
        stopSound(event, 'attackEffect');
      });
      attackedStarted.execute((event) => {
        playSound(event, 'attackEffect');
      });
      attackStopped.execute((event) => {
        stopSound(event, 'attackEffect');
      });
      died.execute((event) => {
        stopSound(event, 'attackEffect');
        playSound(event, 'dead');
      });
    }
  )
  .build();
